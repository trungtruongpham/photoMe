import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { MessageDto } from 'src/app/shared/models/messagedto';
import { User } from 'src/app/shared/models/User';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-test',
  templateUrl: './chat-test.component.html',
  styleUrls: ['./chat-test.component.scss']
})
export class ChatTestComponent implements OnInit {

  constructor(private chatService: ChatService, private localStorage: LocalStorageService) { }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
  user: User = new User();

  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.user = this.localStorage.get('user');
    console.log(this.user);
    // tslint:disable-next-line:max-line-length
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });  // calls the service method to get the new messages sent
  }

  send(): void {
    // if (this.msgDto) {
    //   // if (this.msgDto.message.length === 0) {
    //   //   window.alert('Both fields are required.');
    //   //   return;
    //   // } else {
    //   //   this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
    //   // }
    // }
  }

  addToInbox(obj: MessageDto): void {
    const newObj = new MessageDto();
    //newObj.message = obj.message;
    this.msgInboxArray.push(newObj);
  }

}
