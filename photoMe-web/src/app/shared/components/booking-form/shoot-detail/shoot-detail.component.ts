import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Package } from 'src/app/shared/models/Package';
import { PhotoShoot } from 'src/app/shared/models/PhotoShoot';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
  selector: 'app-shoot-detail',
  templateUrl: './shoot-detail.component.html',
  styleUrls: ['./shoot-detail.component.scss']
})
export class ShootDetailComponent implements OnInit {

  timeOptions: any[] = [];
  placeOptions: any[] = [];
  package: Package = new Package();
  shootPrice: string;
  detailForm: FormGroup;
  isShowError: boolean;

  constructor(private bookService: BookingService, private formBuider: FormBuilder) { }

  ngOnInit(): void {
    this.initCombobox();
    this.initForm();
    this.isShowError = false;

    this.package = this.bookService.package;
    this.shootPrice = new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(this.package.price);
    this.detailForm.valueChanges.subscribe(formValue => {
      const newPhotoShoot = new PhotoShoot(formValue.additionInfo, formValue.additionService,
        formValue.meetingPlace, formValue.meetingPlaceDetail, formValue.shootDate, formValue.shootTime);
      this.bookService.setPhotoShoot(newPhotoShoot);
      
      console.log(formValue);
      
      console.log(this.bookService.photoShoot);

    });
  }

  initCombobox(): void {
    this.bookService.getAllOptions().subscribe((res) => {
      res.forEach(option => {
        if (option.type === 'PlaceOption') {
          this.placeOptions.push(option);
        }
        else if (option.type === 'ShootTimeOption') {
          this.timeOptions.push(option);
        }
      });
    });

  }

  initForm(): void {
    this.detailForm = this.formBuider.group({
      shootDate: ['', Validators.required],
      shootTime: ['', Validators.required],
      meetingPlace: ['', Validators.required],
      meetingPlaceDetail: ['', [Validators.maxLength(50), Validators.required]],
      additionInfo: ['', [Validators.maxLength(50), Validators.required]],
      additionService: ['', [Validators.required]]
    });
  }

  onEnterSubmit(event): void {
    if (event.keyCode === 13) {

      if (this.detailForm.invalid) {
        this.isShowError = true;
      }
    }
  }
}
