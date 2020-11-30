import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { User } from '../../models/User';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User = new User();
  isShowNoti: boolean;
  isShowDropdown: boolean;
  notiList: Notification[] = [];

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private localStorage: LocalStorageService,
    private notiService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.localStorage.get('user');
    this.isShowNoti = false;
    this.isShowDropdown = false;
    
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

  showNotiPopup(): void {
    this.isShowNoti = !this.isShowNoti;
    this.notiService.getUserNotifications(this.currentUser.id).subscribe((res) => {
      this.notiList = res;
      console.log(res);
      
    });
  }

  onClickOut(): void {
    console.log('a');

    this.isShowNoti = false;
  }

  onClickOutDropdown(): void{
    this.isShowDropdown = false;
  }

  onClickDropdown(): void {
    this.isShowDropdown = !this.isShowDropdown;
  }
}
