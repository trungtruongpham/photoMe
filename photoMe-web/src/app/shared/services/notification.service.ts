import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notiUrl: string = environment.apiUrl + 'noti/';

  constructor(private httpClient: HttpClient) { }

  getUserNotifications(userId: string): Observable<any> {
    return this.httpClient.get(this.notiUrl + userId);
  }
}
