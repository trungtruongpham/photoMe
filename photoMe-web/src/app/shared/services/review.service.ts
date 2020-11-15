import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviewUrl = environment.apiUrl + 'review/';

  constructor(private httpClient: HttpClient) { }

  reviewAlbum(review: any): Observable<any> {
    return this.httpClient.post(this.reviewUrl + 'new-review', review);
  }

  getAlbumReviews(albumId: string): Observable<any> {
    return this.httpClient.get(this.reviewUrl + albumId);
  }

  getPagedReviews(page: number, size: number, albumId: string): Observable<any> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };

    return this.httpClient.get(this.reviewUrl + albumId + '/paged', {
      params,
    });
  }
}


