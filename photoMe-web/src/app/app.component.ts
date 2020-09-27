import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './shared/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  ngOnInit(): void {
  }

  constructor(private elementRef: ElementRef){

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void{
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f4f4';
 }
}
