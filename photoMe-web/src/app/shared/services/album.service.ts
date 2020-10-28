import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  albumUrl = environment.apiUrl + 'user/' + this.authService.decodedToken.nameid + '/albums';

  constructor(private authService: AuthService, private httpCLient: HttpClient, private localStorage: LocalStorageService) { }

  getAlbumById(albumId: string): Observable<any> {
    const url = this.albumUrl + '/' + albumId;

    return this.httpCLient.get(url, {
      headers: {
        Authorization: 'Bearer ' + this.localStorage.get('token'),
      }
    });
  }

  getAllAlbum(): Observable<any>{
    const url = this.albumUrl + '/all';

    return this.httpCLient.get(url, {
      headers: {
        Authorization: 'Bearer ' + this.localStorage.get('token'),
      }
    });
  }

  getUserAlbums(userId: string): Observable<any> {
    const url = this.albumUrl + '/';

    return this.httpCLient.get(url, {
      headers: {
        Authorization: 'Bearer ' + this.localStorage.get('token'),
      }
    });
  }
}
