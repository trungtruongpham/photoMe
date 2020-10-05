import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  uploadFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('File', fileToUpload, fileToUpload.name);

    return this.httpClient.post(
      this.baseUrl + 'user/' + this.authService.decodedToken.nameid + '/photos',
      formData
    );
  }

  uploadFiles(fileToUpload: File[]): Observable<any> {
    const formData: FormData = new FormData();

    return this.httpClient.post(
      this.baseUrl + 'user/' + this.authService.decodedToken.nameid + '/photos',
      formData
    );
  }
}
