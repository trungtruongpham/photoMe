import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { AlertifyService } from './shared/services/alertify.service';
import { AuthService } from './shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCarouselModule.forRoot(),
    CarouselModule.forRoot(),
    MatDividerModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [
    AlertifyService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
