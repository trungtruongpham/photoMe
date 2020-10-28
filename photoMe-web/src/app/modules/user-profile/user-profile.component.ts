import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { SelectItem } from 'primeng/api/selectitem';
import { Album } from 'src/app/shared/models/Album';
import { Photo } from 'src/app/shared/models/Photo';
import { User } from 'src/app/shared/models/User';
import { AlbumService } from 'src/app/shared/services/album.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: User = new User();
  listAlbums: Album[];
  listPhotos: Photo[];

  constructor(public authService: AuthService, private userService: UserService, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.localStorage.get('user');
    this.userService.getUserById(this.currentUser.id).subscribe((res) => {
      this.listAlbums = res.albums;
      this.listPhotos = res.photos;
    });
  }
}
