import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/guards/auth-guard.service';
import { ChatComponent } from '../chat/chat.component';
import { HomeComponent } from '../home/home.component';
import { PhotoshootBookingComponent } from '../photoshoot-booking/photoshoot-booking.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MainComponent } from './main.component';
import { MainModule } from './main.module';



const mainRoutes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardService],
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'user/:userId', component: UserProfileComponent, canActivate: [AuthGuardService] },
      { path: 'inbox', component: ChatComponent, canActivate: [AuthGuardService] },
      { path: 'inbox/:contactId', component: ChatComponent, canActivate: [AuthGuardService] },
      { path: 'booking-list', component: PhotoshootBookingComponent, canActivate: [AuthGuardService] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'booking', loadChildren: () => import('../booking/booking.module').then(m => m.BookingModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
