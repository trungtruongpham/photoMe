import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CalendarModule } from 'primeng/calendar';
import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    MainRoutingModule
  ],
  declarations: [MainComponent, HeaderComponent, NotificationComponent]
})
export class MainModule { }
