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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './modules/home/home.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { PostComponent } from './shared/components/post/post.component';
import { NewPostInputComponent } from './shared/components/new-post-input/new-post-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'primeng/fileupload';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { UserCardComponent } from './shared/components/user-card/user-card.component';
import { ChatComponent } from './modules/chat/chat.component';
import { MessageBoxComponent } from './shared/components/message-box/message-box.component';
import { MessageComponent } from './shared/components/message/message.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactAlbumComponent } from './shared/components/react-album/react-album.component';
import { NewChatDialogComponent } from './shared/components/new-chat-dialog/new-chat-dialog.component';
import { ReviewComponent } from './shared/components/review/review.component';
import { InfiniteScrollComponent } from './shared/components/infinite-scroll/infinite-scroll.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TokenInterceptor } from './shared/helpers/token.interceptor';
import { PhotoshootBookingComponent } from './modules/photoshoot-booking/photoshoot-booking.component';
import { CalendarModule } from 'primeng/calendar';
import { MainModule } from './modules/main/main.module';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { LandingComponent } from './modules/landing/landing.component';
import { PhotoshootComponent } from './shared/components/photoshoot/photoshoot.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    PostComponent,
    NewPostInputComponent,
    UserProfileComponent,
    ChatComponent,
    MessageBoxComponent,
    MessageComponent,
    ReactAlbumComponent,
    NewChatDialogComponent,
    ReviewComponent,
    InfiniteScrollComponent,
    PhotoshootBookingComponent,
    LandingComponent,
    PhotoshootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCarouselModule.forRoot(),
    CarouselModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    NgxMatFileInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FileUploadModule,
    SelectButtonModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    DropdownModule,
    GalleriaModule,
    RouterModule,
    FontAwesomeModule,
    ProgressSpinnerModule,
    CalendarModule,
    MainModule,
    CreditCardDirectivesModule
  ],
  providers: [
    AlertifyService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
