import { ɵangular_packages_common_http_http_a } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Album } from '../../models/Album';
import { Like } from '../../models/Like';
import { Photo } from '../../models/Photo';
import { User } from '../../models/User';
import { AlbumService } from '../../services/album.service';
import { AlertifyService } from '../../services/alertify.service';
import { LikeService } from '../../services/like.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() albumId: string;
  currentUser: User = new User();
  images: [];
  album: Album = new Album();
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

  constructor(private albumService: AlbumService, private alertify: AlertifyService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.loadAlbumData();
  }

  loadAlbumData(): void {
    this.albumService.getAlbumById(this.albumId).subscribe((res) => {
      this.album = res;
      this.images = res.photos;
      this.currentUser = res.photographer;
      this.setDefaultAvatar();
    });
  }

  setDefaultAvatar(): void {
    if (this.currentUser.avatar === null || this.currentUser.avatar === undefined) {
      this.currentUser.avatar = new Photo();
      if (this.currentUser.gender === 'female') {
        // tslint:disable-next-line:max-line-length
        this.currentUser.avatar.url = 'https://user-images.githubusercontent.com/32018323/96729543-749ccd00-13df-11eb-99ef-ac493f185a91.png';
      }
      else {
        // tslint:disable-next-line:max-line-length
        this.currentUser.avatar.url = 'https://user-images.githubusercontent.com/32018323/96729540-74043680-13df-11eb-8e33-82f40db5b8c5.png';
      }
    }
  }

  onLikeClick(): void {
    this.loadAlbumData();
  }
}
