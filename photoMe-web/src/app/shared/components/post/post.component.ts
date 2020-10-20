import { ɵangular_packages_common_http_http_a } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  constructor(private photoService: PhotoService) { }

  @Input() albumId: string;
  listAlbumPhotos: any;
  images: [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  ngOnInit(): void {
    this.photoService.getAlbumPhotos(this.albumId).subscribe((res) => {
      console.log(res);
      this.listAlbumPhotos = res;
      // res.forEach(item => {
      //   this.images.push({ url: item.url });
      // });
      this.images = res;
      console.log(this.images);
    }, error => {
      console.log(error);
    });
    console.log(this.listAlbumPhotos);
  }
}
