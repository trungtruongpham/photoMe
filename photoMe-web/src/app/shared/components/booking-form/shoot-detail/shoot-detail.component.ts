import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/shared/models/Package';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
  selector: 'app-shoot-detail',
  templateUrl: './shoot-detail.component.html',
  styleUrls: ['./shoot-detail.component.scss']
})
export class ShootDetailComponent implements OnInit {

  timeOptions: any[];
  placeOptions: any[];
  additionalService: any[];
  package: Package = new Package();
  shootPrice: string;

  constructor(private bookService: BookingService) { }

  ngOnInit(): void {
    this.timeOptions = [
      {name: '8:00 AM', code: 8},
      {name: '9:00 AM', code: 9},
      {name: '10:00 AM', code: 10},
      {name: '11:00 AM', code: 11},
      {name: '1:00 PM', code: 13},
      {name: '2:00 PM', code: 14},
      {name: '3:00 PM', code: 15},
      {name: '4:00 PM', code: 16},
      {name: '5:00 PM', code: 17},
    ];

    this.placeOptions = [
      {name: 'Hotel', code: 'ht'},
      {name: 'Airport', code: 'ap'},
      {name: 'Attraction', code: 'at'},
      {name: 'CoffeShop', code: 'cs'},
      {name: 'Landmark', code: 'lm'},
      {name: 'Others', code: 'ot'},
    ];

    this.placeOptions = [
      {name: 'Portraits', code: 'ht'},
      {name: 'Photo Rights Usage / Permission Inquiry', code: 'ap'},
      {name: 'Attraction', code: 'at'},
      {name: 'CoffeShop', code: 'cs'},
      {name: 'Landmark', code: 'lm'},
      {name: 'Others', code: 'ot'},
    ];

    this.package = this.bookService.package;
    this.shootPrice = new Intl.NumberFormat('vi-VN', {maximumSignificantDigits: 3}).format(this.package.price);
    console.log(this.package);
  }


  nextStep(): void {

  }
}
