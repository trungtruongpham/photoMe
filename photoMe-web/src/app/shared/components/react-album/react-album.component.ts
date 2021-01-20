import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Like } from '../../models/Like';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-react-album',
  templateUrl: './react-album.component.html',
  styleUrls: ['./react-album.component.scss']
})
export class ReactAlbumComponent implements OnInit {

  @Input() albumId: string;
  @Input() likesNumber: number;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onLikeAlbum = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCommentAlbum = new EventEmitter();
  isLiked: boolean;

  constructor(private likeService: LikeService, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit(): void {
    this.likeService.getUserLike(this.albumId).subscribe((res) => {
      if (res === null || res === undefined) {
        this.isLiked = false;
      }
      else {
        this.isLiked = true;
      }
    });
  }

  onLikeClick(): void {
    const like = new Like();
    like.albumId = this.albumId;
    like.makerId = this.authService.decodedToken.nameid;
    this.likeService.likeAlbum(like).subscribe((res) => {
      if (res === null || res === undefined) {
        this.alertify.error('Unliked album');
        this.isLiked = !this.isLiked;
        this.onLikeAlbum.emit();
        return;
      }

      this.alertify.success('Liked album!');
      this.isLiked = !this.isLiked;
      this.onLikeAlbum.emit();
    }, error => {
      this.alertify.error('Like failed! Please try again');
    });
  }

  onCommentClick(): void {
    this.onCommentAlbum.emit(true);
  }
}
