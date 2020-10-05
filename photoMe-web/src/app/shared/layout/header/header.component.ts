import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    console.log(this.authService.decodedToken);
    console.log(this.authService.currentUser);
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logOut(): void {
    this.localStorage.remove('token');
    this.localStorage.remove('user');

    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.success('Logged out');
    this.router.navigate(['/']);
  }
}
