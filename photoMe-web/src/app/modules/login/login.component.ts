import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showDiv = {
    isSignUp: false,
    isforgotPassword: false,
  };

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.localStorage.clear();
    this.localStorage.remove('token');
    this.localStorage.remove('user');
  }

  rePasswordValidate(): any {
    if (this.loginForm.controls.password.value !== this.loginForm.controls.rePassword.value) {
      return true;
    }
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (next) => {
        this.alertifyService.success('Login successful');
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error) => {
        this.alertifyService.error('Login failed! Please check again your username and password.');
      },
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

  register(): void {
    this.authService.register(this.loginForm.value).subscribe((res) => {
      this.alertifyService.success('Signup successful! Welcome to photoMe.');
    },
      (error) => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(['/home']);
      });
  }
}
