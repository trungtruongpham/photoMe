import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { environment } from 'src/environments/environment';
import { AlbumForCreation } from '../../models/AlbumForCreation';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-new-post-input',
  templateUrl: './new-post-input.component.html',
  styleUrls: ['./new-post-input.component.scss']
})
export class NewPostInputComponent implements OnInit {
  @ViewChild('fileInput') fileInput: FileUpload;

  albumTypes: any[];
  selectedAlbumType: any;
  uploadedFiles: any[] = [];
  url: string;
  isShowPopup: boolean;
  chooseLable = 'Chọn';
  newAlbum: AlbumForCreation;
  newAlbumForm = new FormGroup({
    title: new FormControl(''),
    type: new FormControl(''),
    photos: new FormControl(''),
  });

  constructor(private fileUploadService: FileUploadService, private alertify: AlertifyService, public authService: AuthService) {
    this.url = environment.apiUrl + 'user/' + authService.decodedToken.nameid + '/photos/upload-photos';
    this.isShowPopup = false;
    this.albumTypes = [
      { name: 'Thiên nhiên', code: 'TN' },
      { name: 'Phong cảnh', code: 'PC' },
      { name: 'Học đường', code: 'HD' }
    ];

    this.newAlbum = new AlbumForCreation();
  }

  ngOnInit(): void {
  }

  uploadFile(): void {
    this.fileInput.files.forEach(file => {
      this.uploadedFiles.push(file);
    });

    this.fileUploadService.uploadFiles(this.uploadedFiles).subscribe(res => {
      this.alertify.success('Tải ảnh thành công');
    }, error => {
      this.alertify.error('Tải thất bại.');
    });
  }

  handleNewPostClick(): void {
    this.isShowPopup = !this.isShowPopup;
  }

  submitNewAlbum(): void {
    this.newAlbumForm.controls.photos.setValue(this.fileInput.files);

    this.newAlbum.title = this.newAlbumForm.controls.title.value;
    this.newAlbum.albumType = this.newAlbumForm.controls.type.value.name;
    this.newAlbum.files = this.newAlbumForm.controls.photos.value;

    this.fileUploadService.uploadAlbum(this.newAlbum).subscribe((res) => {
      this.clearForm();
      this.alertify.success('Tải lên thành công!');
    }, error => {
      this.alertify.error('Tải lên thất bại!');
    });
  }

  clearForm(): void {
    this.newAlbumForm.reset();
    this.fileInput.clear();
  }
}
