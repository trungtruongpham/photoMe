import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};

  showDiv = {
    issignUp: false,
    isforgotPassword: false,
  };

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertifyService.success('Login successful');
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error) => {
        this.alertifyService.error(error);
      },
      () => {
        this.router.navigate(['/home']);
      }
    );
  }
}
