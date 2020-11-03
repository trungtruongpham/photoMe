import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviewUrl = environment.apiUrl + 'review/';

  constructor(private httpClient: HttpClient, private authService: AuthService, private localStorage: LocalStorageService) { }

  reviewAlbum(review: any): Observable<any> {
    return this.httpClient.post(this.reviewUrl + 'new-review', review, {
      headers: {
        Authorization: 'Bearer ' + this.localStorage.get('token')
      }
    });
  }

  getAlbumReviews(albumId: string): Observable<any> {
    return this.httpClient.get(this.reviewUrl + albumId, {
      headers: {
        Authorization: 'Bearer ' + this.localStorage.get('token')
      }
    });
  }
}


