import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { ChatComponent } from './modules/chat/chat.component';
import { ReviewComponent } from './shared/components/review/review.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardService],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'user/:userId', component: UserProfileComponent, canActivate: [AuthGuardService] },
      { path: 'inbox', component: ChatComponent, canActivate: [AuthGuardService] },
      { path: 'inbox/:contactId', component: ChatComponent, canActivate: [AuthGuardService] },
      { path: 'review', component: ReviewComponent}
    ]
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

