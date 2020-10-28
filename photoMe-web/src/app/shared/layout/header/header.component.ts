import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { Photo } from '../../models/Photo';
import { User } from '../../models/User';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { PhotoService } from '../../services/photo.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User = new User();

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.localStorage.get('user');
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logOut(): void {
    this.localStorage.clear();
    this.localStorage.remove('token');
    this.localStorage.remove('user');

    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.success('Đăng xuất thành công.');
    this.router.navigate(['/']);
  }
}
