import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from 'src/app/shared/components/booking-form/confirmation/confirmation.component';
import { PackagesComponent } from 'src/app/shared/components/booking-form/packages/packages.component';
import { ShootDetailComponent } from 'src/app/shared/components/booking-form/shoot-detail/shoot-detail.component';
import { BookingComponent } from './booking.component';


const routes: Routes = [
    {
        path: '',
        component: BookingComponent,
        children: [
            {
                path: 'package',
                component: PackagesComponent,
            },
            {
                path: 'detail',
                component: ShootDetailComponent,
            },
            {
                path: 'confirm',
                component: ConfirmationComponent,
            },
            {
                path: '**',
                component: PackagesComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BookingRoutingModule { }
