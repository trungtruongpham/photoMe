import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-localstorage';
import { FileUpload } from 'primeng/fileupload';
import { environment } from 'src/environments/environment';
import { AlbumForCreation } from '../../models/AlbumForCreation';
import { User } from '../../models/User';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { FileUploadService } from '../../services/file-upload.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-post-input',
  templateUrl: './new-post-input.component.html',
  styleUrls: ['./new-post-input.component.scss']
})
export class NewPostInputComponent implements OnInit {
  @ViewChild('fileInput') fileInput: FileUpload;
  @Output() submitAlbum = new EventEmitter();

  albumTypes: any[];
  selectedAlbumType: any;
  uploadedFiles: any[] = [];
  url: string;
  isShowPopup: boolean;
  chooseLable = 'Choose';
  newAlbum: AlbumForCreation;
  currentUser: User;
  newAlbumForm = new FormGroup({
    title: new FormControl(''),
    type: new FormControl(''),
    photos: new FormControl(''),
  });

  constructor(private fileUploadService: FileUploadService, private alertify: AlertifyService,
              public authService: AuthService, private userService: UserService, private localStorage: LocalStorageService) {
    this.url = environment.apiUrl + 'user/' + authService.decodedToken.nameid + '/photos/upload-photos';
    this.isShowPopup = false;
    this.albumTypes = [
      { name: 'Natural Scene', code: 'NS' },
      { name: 'Model', code: 'MD' },
      { name: 'School', code: 'SC' },
      { name: 'ComicDesign', code: 'CD'},
    ];

    this.newAlbum = new AlbumForCreation();
  }

  ngOnInit(): void {
    this.currentUser = this.localStorage.get('user');
  }

  uploadFile(): void {
    this.fileInput.files.forEach(file => {
      this.uploadedFiles.push(file);
    });

    this.fileUploadService.uploadFiles(this.uploadedFiles).subscribe(res => {
      this.alertify.success('Upload successful');
    }, error => {
      this.alertify.error('Upload failed :(');
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
      this.isShowPopup = false;
      this.alertify.success('Upload successful!');
      this.submitAlbum.emit();
    }, error => {
      this.alertify.error('Upload failed!');
    });
  }

  clearForm(): void {
    this.newAlbumForm.reset();
    this.fileInput.clear();
  }
}
