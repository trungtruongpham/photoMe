import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCardValidators } from 'angular-cc-library';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  shootPrice: string;
  servicePrice: string;
  vatRate = 0.1;
  vatPrice: string;
  total: string;
  creditForm: FormGroup;

  constructor(
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.calculatePrice();
  }

  calculatePrice(): void {
    const shoot = this.bookingService.package;

    this.shootPrice = new Intl.NumberFormat('vi-VN', {
      maximumSignificantDigits: 3,
    }).format(shoot.price);
    this.servicePrice = new Intl.NumberFormat('vi-VN', {
      maximumSignificantDigits: 3,
    }).format(200000);
    this.vatPrice = new Intl.NumberFormat('vi-VN', {
      maximumSignificantDigits: 3,
    }).format((shoot.price + 200000) * this.vatRate);

    const totalPrice =
      shoot.price + 200000 + (shoot.price + 200000) * this.vatRate;
    this.total = new Intl.NumberFormat('vi-VN', {
      maximumSignificantDigits: 3,
    }).format(totalPrice);
  }

  initForm(): void {
    this.creditForm = this.formBuilder.group({
      holderName: ['', [Validators.required, Validators.maxLength(40)]],
      creditCard: [
        '',
        [CreditCardValidators.validateCCNumber, Validators.required],
      ],
      expireDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required]],
    });
  }

  onSubmitCheckout(): void {
    if (this.creditForm.invalid) {
      this.alertify.error('Credit-card is not valid! Please try again!');
    } else {
      console.log('valid form');
      this.bookingService.photoShoot.paymentMethod = 'credit-card';
      this.onBookingConfirm();
    }
  }

  onSubmitPaidByCash(): void {
    this.bookingService.photoShoot.paymentMethod = 'cash';
    this.onBookingConfirm();
  }

  onBookingConfirm(): void {
    this.bookingService
      .bookPhotoShoot(this.bookingService.photoShoot)
      .subscribe(
        (res) => {
          if (res !== null || res !== undefined) {
            this.alertify.success('Booking success!');
            this.router.navigate(['/booking-list']);
          }
        },
        (err) => {
          this.alertify.error('Booking failed!');
        }
      );
  }
}
