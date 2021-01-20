import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { User } from '../../models/User';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User = new User();
  isShowNoti: boolean;
  isShowDropdown: boolean;
  isSearching: boolean;
  notiList: Notification[] = [];
  username: string;
  listUserSearch: User[] = [];

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private localStorage: LocalStorageService,
    private notiService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.localStorage.get('user');
    this.isShowNoti = false;
    this.isShowDropdown = false;
    this.isSearching = false;
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
    this.alertify.success('Logout successful.');
    this.router.navigate(['/login']);
  }

  showNotiPopup(): void {
    this.isShowNoti = !this.isShowNoti;
    this.notiService
      .getUserNotifications(this.currentUser.id)
      .subscribe((res) => {
        this.notiList = res;
        console.log(res);
      });
  }

  onClickOut(): void {
    console.log('a');

    this.isShowNoti = false;
    this.isSearching = false;
  }

  onClickOutDropdown(): void {
    this.isShowDropdown = false;
  }

  onClickDropdown(): void {
    this.isShowDropdown = !this.isShowDropdown;
  }

  onSearchUser(): void {
    this.isSearching = true;
    console.log(this.isSearching);
    

    this.userService.searchUser({ username: this.username }).subscribe(
      (res) => {
        if (res !== undefined && res !== null) {
          this.listUserSearch = res;
          console.log(this.listUserSearch);
        }
      },
      (error) => {
        this.alertify.error('Search user failed! Please try again later.');
      }
    );
  }
}
