import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageUrl: string = environment.apiUrl + 'chat/';

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  getTalkMessage(contactId: string): Observable<any> {
    return this.httpClient.get(this.messageUrl + 'get-talk-messages/' + contactId, {
      headers: {
        Authorization: 'Bearer ' + this.localStorage.get('token')
      }
    });
  }

  getListContact(): Observable<any> {
    return this.httpClient.get(this.messageUrl + 'get-list-contact', {
      headers: {
        Authorization: 'Bearer ' + this.localStorage.get('token')
      }
    });
  }
}
