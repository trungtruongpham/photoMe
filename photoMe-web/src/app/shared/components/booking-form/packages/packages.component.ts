import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PackageComponent } from '../package/package.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  constructor(private router: Router, private bookingService: BookingService, private alertify: AlertifyService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  nextStep(): void {
    this.router.navigate(['/booking/detail']);
  }

  onSelectPackage(event): void{
    this.bookingService.package = event;
    this.bookingService.photoShoot.modelId = this.authService.decodedToken.nameid;
    this.bookingService.photoShoot.modelId = this.bookingService.photoShoot.modelId.toUpperCase();
    this.bookingService.photoShoot.price = event.price;
    this.alertify.success('Package choosed!');
    this.router.navigate(['/booking/detail']);
  }
}
