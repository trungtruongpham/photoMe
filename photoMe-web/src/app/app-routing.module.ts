import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

