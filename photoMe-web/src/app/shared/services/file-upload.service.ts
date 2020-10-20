import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlbumForCreation } from '../models/AlbumForCreation';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl = environment.apiUrl;
  fileUploadUrl = this.baseUrl + 'user/' + this.authService.decodedToken.nameid;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private localStorage: LocalStorageService,
  ) { }

  uploadFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('File', fileToUpload, fileToUpload.name);

    return this.httpClient.post(
      this.fileUploadUrl + '/photos/upload-photo',
      formData
    );
  }

  uploadFiles(fileToUpload: File[]): Observable<any> {
    const formData: FormData = new FormData();

    fileToUpload.forEach(file => {
      formData.append('Files', file);
    });

    return this.httpClient.post(
      this.fileUploadUrl + + '/photos/upload-photos',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + this.localStorage.get('token'),
        }
      }
    );
  }

  uploadAlbum(albumFroCreation: AlbumForCreation): Observable<any> {
    const formData: FormData = new FormData();

    console.log(this.authService.token);
    formData.append('Title', albumFroCreation.title);
    formData.append('AlbumType', albumFroCreation.albumType);
    albumFroCreation.files.forEach(file => {
      formData.append('Files', file);
    });

    return this.httpClient.post(
      this.fileUploadUrl + '/albums/upload-album',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + this.localStorage.get('token'),
        }
      }
    );
  }
}
