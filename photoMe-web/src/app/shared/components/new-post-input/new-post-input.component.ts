import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertifyService } from '../../services/alertify.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-new-post-input',
  templateUrl: './new-post-input.component.html',
  styleUrls: ['./new-post-input.component.scss']
})
export class NewPostInputComponent implements OnInit {
  fileInputConfig: {
    placeHolder: 'Tải lên ảnh mới',
    multiple: 'true'
  };

  placeHolder: 'Tải lên ảnh mới';
  file: any;
  uploadedFiles: any[] = [];

  constructor(private fileUploadService: FileUploadService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  onUpload(event): void{

  }

  uploadFile(): void {
    console.log(this.file);
    this.fileUploadService.uploadFile(this.file).subscribe(() => {
      this.alertify.success('Upload success');
    }, error => {
      this.alertify.error('Upload failed');
    });
  }
}
