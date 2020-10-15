import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-localstorage';

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

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  changeMemberPhoto(photoUrl: string): void {
    this.photoUrl.next(photoUrl);
  }

  // tslint:disable-next-line: typedef
  login(model: any) {
    return this.http.post(this.baseUrl + 'Login', model).pipe(
      map((response: any) => {
        const token = response.token;
        const user = response.user;
        if (token) {
          this.localStorage.set('token', token);
          this.localStorage.set('user', JSON.stringify(user));
          this.decodedToken = this.jwtHelper.decodeToken(token);
          console.log(this.decodedToken);
          this.token = token;
          this.currentUser = user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
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
}
