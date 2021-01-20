import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CalendarModule } from 'primeng/calendar';
import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from 'src/app/shared/components/user-card/user-card.component';

@NgModule({
  imports: [CommonModule, CalendarModule, MainRoutingModule, FormsModule],
  declarations: [
    MainComponent,
    HeaderComponent,
    NotificationComponent,
    UserCardComponent
  ],
})
export class MainModule {}
