import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { PackageComponent } from '../package/package.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  constructor(private router: Router, private bookingService: BookingService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  nextStep(): void {
    this.router.navigate(['/booking/detail']);
  }

  onSelectPackage(event): void{
    this.bookingService.package = event;
    console.log(this.bookingService.package);
    
    this.alertify.success('Package choosed!');
    this.router.navigate(['/booking/detail']);
  }
}
