import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { Album } from '../../models/Album';
import { Photo } from '../../models/Photo';
import { Review } from '../../models/Review';
import { User } from '../../models/User';
import { AlbumService } from '../../services/album.service';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() albumId: string;
  photographer: User = new User();
  images: [];
  reviews: Review[] = [];
  album: Album = new Album();
  isNoReview: boolean;
  reviewMessage: string;
  newReview: Review = new Review();

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

  constructor(private albumService: AlbumService, private alertify: AlertifyService, private localStorageService: LocalStorageService,
              private reviewService: ReviewService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isNoReview = false;
    this.loadAlbumData();
    this.loadReviews(this.albumId);
    console.log('load 1 album');
  }

  loadAlbumData(): void {
    this.albumService.getAlbumById(this.albumId).subscribe((res) => {
      this.album = res;
      this.images = res.photos;
      this.photographer = res.photographer;
      this.setDefaultAvatar();
    });
  }

  loadReviews(albumId: string): void {
    this.reviewService.getAlbumReviews(this.albumId).subscribe(res => {
      if (res === null || res === undefined) {
        this.isNoReview = true;
      }
      this.reviews = res;
    });
  }

  setDefaultAvatar(): void {
    if (this.photographer.avatar === null || this.photographer.avatar === undefined) {
      this.photographer.avatar = new Photo();
      if (this.photographer.gender === 'female') {
        // tslint:disable-next-line:max-line-length
        this.photographer.avatar.url = 'https://user-images.githubusercontent.com/32018323/96729543-749ccd00-13df-11eb-99ef-ac493f185a91.png';
      }
      else {
        // tslint:disable-next-line:max-line-length
        this.photographer.avatar.url = 'https://user-images.githubusercontent.com/32018323/96729540-74043680-13df-11eb-8e33-82f40db5b8c5.png';
      }
    }
  }

  onLikeClick(): void {
    this.loadAlbumData();
  }

  onEnterReview(event): void {
    event.preventDefault();

    this.newReview.reviewMessage = this.reviewMessage;
    this.newReview.albumId = this.albumId;
    this.newReview.makerId = this.authService.decodedToken.nameid;

    this.reviewService.reviewAlbum(this.newReview).subscribe(res => {
      this.reviewMessage = '';
      this.loadReviews(this.albumId);

      this.alertify.success('Thêm nhận xét thành công!');
    }, error => {
      this.alertify.error('Thêm review thất bại!');
    });
  }
}
