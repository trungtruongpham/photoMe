import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessageDto } from '../models/messagedto';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { LocalStorageService } from 'ngx-localstorage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // tslint:disable-next-line:max-line-length
  private connection: any = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5000/chatsocket', { accessTokenFactory: () => this.localStorage.get('token')})
    .configureLogging(signalR.LogLevel.Information)
    .build();


  readonly POST_URL = environment.apiUrl + 'chat/send';
  readonly POST_URL2 = environment.apiUrl + 'chat/send/';
  private connectionId: string;

  private receivedMessageObject: MessageDto = new MessageDto();
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient, private authService: AuthService, private localStorage: LocalStorageService) {
    this.connection.onclose(async () => {
      await this.start();
    });

    // tslint:disable-next-line:max-line-length
    this.connection.on('SendToSpecificUser', (senderId, receiverId, content) => { this.mapReceivedMessage(senderId, receiverId, content); });
    this.start();
  }


  // Strart the connection
  // tslint:disable-next-line:typedef
  public async start() {
    try {
      await this.connection.start();
      console.log('connected');
      console.log(this.connection);
      this.connection.invoke('GetConnectionId').then((res) => {
        this.connectionId = res;
      });

      this.connection.invoke('GetUser').then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(senderId: string, receiverId: string, content: string): void {
    this.receivedMessageObject.content = content;
    this.receivedMessageObject.receiverId = receiverId;
    this.receivedMessageObject.senderId = senderId;
    // tslint:disable-next-line:max-line-length
    this.authService.decodedToken.nameid === senderId ? this.receivedMessageObject.messageType = 'send' : this.receivedMessageObject.messageType = 'receive';
    this.sharedObj.next(this.receivedMessageObject);
  }


  // Calls the controller method
  public broadcastMessage(msgDto: MessageDto): void {
    this.http.post(this.POST_URL2 + msgDto.receiverId, msgDto).subscribe(data => console.log(data));
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }
}
