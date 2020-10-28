import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { ChatTestComponent } from './modules/chat-test/chat-test.component';
import { ChatComponent } from './modules/chat/chat.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardService],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'user', component: UserProfileComponent, canActivate: [AuthGuardService] },
      { path: 'chat', component: ChatTestComponent, },
      // { path: 'inbox', component: ChatComponent, canActivate: [AuthGuardService] },
      { path: 'inbox', redirectTo: 'inbox/', pathMatch: 'full' },
      { path: 'inbox/:contactId', component: ChatComponent }
    ]
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

