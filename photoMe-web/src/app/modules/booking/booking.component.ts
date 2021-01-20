import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Package } from 'src/app/shared/models/Package';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  isStep2: boolean;
  isStep3: boolean;
  curStep: number;
  package: Package = new Package();

  constructor(private router: Router, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.isStep2 = false;
    this.isStep3 = false;
    this.curStep = 1;
  }

  nextStep(): void {
    if (this.curStep === 3) {
      return;
    }

    if (this.curStep === 1) {
      this.router.navigate(['/booking/detail']);
      this.isStep2 = !this.isStep2;
      this.curStep = 2;
    }
    else if (this.curStep === 2) {
      this.router.navigate(['booking/confirm']);
      this.isStep3 = !this.isStep3;
      this.curStep = 3;
    }
  }

  prevStep(): void {
    if (this.curStep === 1) {
      this.router.navigate(['/home']);
      return;
    }
    else if (this.curStep === 2) {
      this.router.navigate(['/booking']);
      this.isStep2 = !this.isStep2;
      this.curStep = 1;
    }
    else if (this.curStep === 3) {
      this.router.navigate(['booking/detail']);
      this.isStep3 = !this.isStep3;
      this.curStep = 2;
    }
  }

  onActivateRoute(): void {
    if (this.curStep === 1 && this.router.url === '/booking/detail') {
      this.curStep = 2;
    }
  }
}
