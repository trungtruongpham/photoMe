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
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './shared/layout/header/header.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    PostComponent,
    NewPostInputComponent,
    UserProfileComponent,
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
    GalleriaModule
  ],
  providers: [
    AlertifyService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
