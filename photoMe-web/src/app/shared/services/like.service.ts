import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/Like';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  likeUrl = environment.apiUrl + 'user/' + this.authService.decodedToken.nameid + '/likes/';
  constructor(private authService: AuthService, private httpClient: HttpClient, private alertify: AlertifyService,
              private localStorage: LocalStorageService) { }

  likeAlbum(like: Like): Observable<any> {
    return this.httpClient.post(this.likeUrl + 'like-album', like);
  }

  getUserLike(albumId: string): Observable<any> {
    return this.httpClient.get(this.likeUrl + albumId);
  }
}
