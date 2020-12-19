import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  shootPrice: string;
  servicePrice: string;
  vatRate = 0.1;
  vatPrice: string;
  total: string;
  creditForm: FormGroup;

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.calculatePrice();
  }

  calculatePrice(): void {
    const shoot = this.bookingService.package;

    this.shootPrice = new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(shoot.price);
    this.servicePrice = new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(200000);
    this.vatPrice = new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 })
      .format((shoot.price + 200000) * this.vatRate);

    const totalPrice = shoot.price + 200000 + (shoot.price + 200000) * this.vatRate;
    this.total = new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(totalPrice);
  }

  initForm(): void {
    this.creditForm = this.formBuilder.group({
      holderName: ['', [Validators.required, Validators.maxLength(40)]],
      creditCard: ['', [CreditCardValidators.validateCCNumber, Validators.required]],
      expireDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required]]
    });
  }

  onSubmitCheckout(): void {
    if (this.creditForm.invalid) {
      console.log('a');
      console.log(this.creditForm.get('creditCard').errors);
      console.log(this.creditForm.get('expireDate').errors);
    }
    else {
      console.log('valid form');

    }
    console.log(this.creditForm.get('holderName').value);
    console.log(this.creditForm.get('expireDate').value);
  }
}
