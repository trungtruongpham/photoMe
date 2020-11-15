import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photoUrl = environment.apiUrl + 'user/' + this.authService.decodedToken.nameid + '/albums';

  constructor(private authService: AuthService, private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  getAlbumPhotos(albumId: string): Observable<any> {
    const url = this.photoUrl + '/' + albumId + '/photos';

    return this.httpClient.get(url);
  }
}
