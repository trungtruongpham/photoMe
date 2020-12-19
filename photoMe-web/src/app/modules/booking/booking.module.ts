import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { PackagesComponent } from 'src/app/shared/components/booking-form/packages/packages.component';
import { ShootDetailComponent } from 'src/app/shared/components/booking-form/shoot-detail/shoot-detail.component';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BookingStepsComponent } from 'src/app/shared/components/booking-steps/booking-steps.component';
import { PackageComponent } from 'src/app/shared/components/booking-form/package/package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ConfirmationComponent } from 'src/app/shared/components/booking-form/confirmation/confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    BookingRoutingModule,
    StepsModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule
  ],
  declarations: [
    BookingComponent,
    PackagesComponent,
    ShootDetailComponent,
    BookingStepsComponent,
    PackageComponent,
    ConfirmationComponent
  ],
})
export class BookingModule { }
