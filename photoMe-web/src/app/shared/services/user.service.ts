import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../models/Photo';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = environment.apiUrl + 'user';
  constructor(private httpClient: HttpClient) { }

  getUserById(userId: string): Observable<any> {
    const url = this.userUrl + '/' + userId;

    return this.httpClient.get(url);
  }

  setDefaultAvatar(userContact: User): void {
    if (userContact.avatarUrl === null || userContact.avatarUrl === undefined) {
      userContact.avatar = new Photo();
      if (userContact.gender === 'female') {
        // tslint:disable-next-line:max-line-length
        userContact.avatarUrl = 'https://user-images.githubusercontent.com/32018323/96729543-749ccd00-13df-11eb-99ef-ac493f185a91.png';
      }
      else {
        // tslint:disable-next-line:max-line-length
        userContact.avatarUrl = 'https://user-images.githubusercontent.com/32018323/96729540-74043680-13df-11eb-8e33-82f40db5b8c5.png';
      }
    }
  }

  searchUser(user: any): Observable<any> {
    return this.httpClient.post(this.userUrl + '/search', user);
  }
}
