import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Package } from 'src/app/shared/models/Package';
import { Photo } from 'src/app/shared/models/Photo';
import { PhotoShoot } from 'src/app/shared/models/PhotoShoot';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
  selector: 'app-shoot-detail',
  templateUrl: './shoot-detail.component.html',
  styleUrls: ['./shoot-detail.component.scss'],
})
export class ShootDetailComponent implements OnInit {
  timeOptions: any[] = [];
  placeOptions: any[] = [];
  package: Package = new Package();
  shootPrice: string;
  detailForm: FormGroup;
  isShowError: boolean;
  photoShoot: PhotoShoot;

  constructor(
    private bookService: BookingService,
    private formBuider: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initCombobox();
    this.initForm();
    this.isShowError = false;

    this.package = this.bookService.package;
    this.shootPrice = new Intl.NumberFormat('vi-VN', {
      maximumSignificantDigits: 3,
    }).format(this.package.price);

    this.onFormChangeValue();
    if (
      this.bookService.photoShoot !== null ||
      this.bookService.photoShoot !== undefined
    ) {
      this.photoShoot = this.bookService.photoShoot;
      this.setFormValue();
    }
  }

  initCombobox(): void {
    this.bookService.getAllOptions().subscribe((res) => {
      res.forEach((option) => {
        if (option.type === 'PlaceOption') {
          this.placeOptions.push(option);
        } else if (option.type === 'ShootTimeOption') {
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
      additionService: ['', [Validators.required]],
    });
  }

  setFormValue(): void {
    this.detailForm.get('shootDate').setValue(this.photoShoot.shootDate);
    this.detailForm.get('shootTime').setValue(this.photoShoot.shootTime);
    this.detailForm.get('meetingPlace').setValue(this.photoShoot.meetingPlace);
    this.detailForm.get('meetingPlaceDetail').setValue(this.photoShoot.meetingPlaceDetail);
    this.detailForm.get('additionInfo').setValue(this.photoShoot.additionalInfo);
    this.detailForm.get('additionService').setValue(this.photoShoot.additionalService);
  }

  onEnterSubmit(event): void {
    if (event.keyCode === 13) {
      if (this.detailForm.invalid) {
        this.isShowError = true;
      }
    }
  }

  onFormChangeValue(): void {
    this.detailForm.valueChanges.subscribe((formValue) => {
      this.photoShoot = new PhotoShoot(
        formValue.additionInfo,
        formValue.additionService,
        formValue.meetingPlace,
        formValue.meetingPlaceDetail,
        formValue.shootDate,
        formValue.shootTime
      );
      this.bookService.setPhotoShoot(this.photoShoot);
      console.log(this.photoShoot);
      console.log(this.bookService.photoShoot);
    });
  }
}
