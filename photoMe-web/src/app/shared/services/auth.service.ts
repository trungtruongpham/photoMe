import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-localstorage';
import { Photo } from '../models/Photo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  token: string;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/images/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  changeMemberPhoto(photoUrl: string): void {
    this.photoUrl.next(photoUrl);
  }

  // tslint:disable-next-line: typedef
  login(model: any) {
    return this.http.post(this.baseUrl + 'Login', model).pipe(
      map((response: any) => {
        const token = response.token;
        this.currentUser = response.user;
        console.log(this.currentUser);
        this.setDefaultAvatar();
        if (token) {
          this.localStorage.set('token', token);
          this.localStorage.set('user', response.user);
          this.decodedToken = this.jwtHelper.decodeToken(token);
          console.log(this.decodedToken);
          this.token = token;
        }
      })
    );
  }

  register(user: User): any {
    return this.http.post(this.baseUrl + 'Register', user);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);

    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  setDefaultAvatar(): void {
    if (this.currentUser.avatar === null || this.currentUser.avatar === undefined) {
      this.currentUser.avatar = new Photo();
      if (this.currentUser.gender === 'female') {
        // tslint:disable-next-line:max-line-length
        this.currentUser.avatar.url = 'https://user-images.githubusercontent.com/32018323/96729543-749ccd00-13df-11eb-99ef-ac493f185a91.png';
      }
      else {
        // tslint:disable-next-line:max-line-length
        this.currentUser.avatar.url = 'https://user-images.githubusercontent.com/32018323/96729540-74043680-13df-11eb-8e33-82f40db5b8c5.png';
      }
    }
  }
}
