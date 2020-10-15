import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { environment } from 'src/environments/environment';
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

  text: string;
  placeHolder: 'Tải lên ảnh mới';
  file: any;
  uploadedFiles: any[] = [];
  url: string;
  isShowPopup: boolean;
  newAlbumForm = new FormGroup({
    title: new FormControl(''),
    photos: new FormControl(''),
  });

  constructor(private fileUploadService: FileUploadService, private alertify: AlertifyService, public authService: AuthService) {
    this.url = environment.apiUrl + 'user/' + authService.decodedToken.nameid + '/photos/upload-photos';
    this.isShowPopup = false;
  }

  ngOnInit(): void {
  }

  onSelect(event): void {
    console.log(this.fileInput.files);
  }

  uploadFile(): void {
    this.fileInput.files.forEach(file => {
      this.uploadedFiles.push(file);
    });

    this.fileUploadService.uploadFiles(this.uploadedFiles).subscribe(res => {
      this.alertify.success('Upload success');
    }, error => {
      this.alertify.error('Upload failed');
    });
  }

  handleNewPostClick(): void {
    this.isShowPopup = !this.isShowPopup;
  }

  onSubmit(): void {
    console.log(this.alertify);

  }
  submitNewAlbum(): void{
    // this.uploadFile();
    this.newAlbumForm.controls.photos.setValue(this.fileInput.files);
    console.log(this.newAlbumForm.value);
  }
}
