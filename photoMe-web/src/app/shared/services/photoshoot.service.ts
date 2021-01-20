import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoShoot } from '../models/PhotoShoot';

@Injectable({
  providedIn: 'root',
})
export class PhotoshootService {
  private url = environment.apiUrl + 'photoshoot/';

  constructor(private httpCLient: HttpClient) {}

  bookPhotoShoot(photoshoot: PhotoShoot): Observable<any> {
    return this.httpCLient.post(this.url, photoshoot);
  }

  getListPhotoShoot(id: string): Observable<any> {
    return this.httpCLient.get(this.url + id);
  }
}
