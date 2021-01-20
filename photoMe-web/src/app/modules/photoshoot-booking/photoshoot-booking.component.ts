import { Component, OnInit } from '@angular/core';
import { PhotoShoot } from 'src/app/shared/models/PhotoShoot';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { PhotoshootService } from 'src/app/shared/services/photoshoot.service';

@Component({
  selector: 'app-photoshoot-booking',
  templateUrl: './photoshoot-booking.component.html',
  styleUrls: ['./photoshoot-booking.component.scss'],
})
export class PhotoshootBookingComponent implements OnInit {
  date: Date;
  listPhotoShoot: PhotoShoot[] = [];

  constructor(
    private photoshootService: PhotoshootService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.photoshootService
      .getListPhotoShoot(this.authService.decodedToken.nameid)
      .subscribe((res) => {
        if (res != null || res !== undefined) {
          console.log(res);
          this.listPhotoShoot = res;
          console.log(this.listPhotoShoot);
        }
      });
  }

  onSelectDay(e): void {}
}
