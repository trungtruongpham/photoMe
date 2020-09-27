import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showDiv = {
    issignUp: false,
    isforgotPassword: false
  };

  constructor() { }

  ngOnInit(): void {
  }

}
