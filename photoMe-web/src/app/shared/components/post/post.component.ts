import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { Album } from '../../models/Album';
import { Photo } from '../../models/Photo';
import { Review } from '../../models/Review';
import { User } from '../../models/User';
import { AlbumService } from '../../services/album.service';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @ViewChild('newCommentInput') newCommentInput: ElementRef;
  @Input() albumId: string;
  photographer: User = new User();
  images: [];
  reviews: Review[] = [];
  album: Album = new Album();
  isNoReview: boolean;
  reviewMessage: string;
  newReview: Review = new Review();
  page: number;
  isLoading: boolean;

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

  constructor(private albumService: AlbumService, private alertify: AlertifyService, private reviewService: ReviewService,
              private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.page = 1;
    this.isNoReview = false;
    this.loadAlbumData();
    this.loadPagedReviews(this.page, this.albumId);
  }

  loadAlbumData(): void {
    this.albumService.getAlbumById(this.albumId).subscribe((res) => {
      this.album = res;
      this.images = res.photos;
      this.photographer = res.photographer;
      this.setDefaultAvatar();
    });
  }

  loadPagedReviews(page: number, albumId: string): void {
    this.reviewService.getPagedReviews(page, 2, albumId).subscribe((res) => {
      this.isLoading = false;
      if (!Object.keys(res).length) {

        if (page === 1) {
          this.isNoReview = true;
          return;
        }

        this.alertify.error('Bạn đã xem hết đánh giá!');
        return;
      }
      console.log(page);
      console.log(res);
      res.forEach(review => {
        this.reviews.push(review);
      });
    }, () => {
      this.alertify.error('Không thể tải đánh giá!');
    });
  }

  loadReviews(albumId: string): void {
    this.reviewService.getAlbumReviews(albumId).subscribe((res) => {
      if (!Object.keys(res).length) {
        this.isNoReview = true;
      }

      this.reviews = res;
    }, () => {
      this.alertify.error('Không thể tải đánh giá!');
    });
  }

  setDefaultAvatar(): void {
    if (this.photographer.avatarUrl === null || this.photographer.avatarUrl === undefined) {
      this.photographer.avatar = new Photo();
      if (this.photographer.gender === 'female') {
        // tslint:disable-next-line:max-line-length
        this.photographer.avatarUrl = 'https://user-images.githubusercontent.com/32018323/96729543-749ccd00-13df-11eb-99ef-ac493f185a91.png';
      }
      else {
        // tslint:disable-next-line:max-line-length
        this.photographer.avatarUrl = 'https://user-images.githubusercontent.com/32018323/96729540-74043680-13df-11eb-8e33-82f40db5b8c5.png';
      }
    }
  }

  onLikeClick(): void {
    this.loadAlbumData();
  }

  onCommentClick(): void {
    this.newCommentInput.nativeElement.focus();
  }

  onEnterReview(event): void {
    event.preventDefault();

    this.newReview.reviewMessage = this.reviewMessage;
    this.newReview.albumId = this.albumId;
    this.newReview.makerId = this.authService.decodedToken.nameid;
    this.reviewService.reviewAlbum(this.newReview).subscribe(() => {
      this.reviewMessage = '';
      this.loadReviews(this.albumId);
      this.alertify.success('Add new comment successful :)');
    }, () => {
      this.alertify.error('Failed to add new comment :(');
    });
  }

  onViewMoreClick(): void {
    this.page += 1;
    this.isLoading = true;
    console.log(this.page);
    
    this.loadPagedReviews(this.page, this.albumId);
    
  }
}
