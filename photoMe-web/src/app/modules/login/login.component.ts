import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { flatMap } from 'rxjs/operators';
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
    private router: Router
  ) { }

  ngOnInit(): void { }

  rePasswordValidate(): any {
    if (this.loginForm.controls.password.value !== this.loginForm.controls.rePassword.value) {
      return true;
    }
  }

  login(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (next) => {
        this.alertifyService.success('Login successful');
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error) => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(['/home']);
        console.log(this.authService.decodedToken);
        console.log(this.authService.currentUser);
      }
    );
  }

  register(): void {
    this.authService.register(this.loginForm.value).subscribe((res) => {
      this.alertifyService.success('Register successful');
    },
      (error) => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(['/home']);
      });
  }
}
