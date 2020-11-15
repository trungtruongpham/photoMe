import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageUrl: string = environment.apiUrl + 'chat/';

  constructor(private httpClient: HttpClient) { }

  getTalkMessage(contactId: string): Observable<any> {
    return this.httpClient.get(this.messageUrl + 'get-talk-messages/' + contactId);
  }

  getListContact(): Observable<any> {
    return this.httpClient.get(this.messageUrl + 'get-list-contact');
  }
}
