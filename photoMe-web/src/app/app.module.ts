import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './modules/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCarouselModule.forRoot(),
    CarouselModule.forRoot(),
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
