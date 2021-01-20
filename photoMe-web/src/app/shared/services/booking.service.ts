import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Package } from '../models/Package';
import { PhotoShoot } from '../models/PhotoShoot';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private optionUrl = environment.apiUrl + 'options/';
  private bookingUrl = environment.apiUrl + 'photoshoot';
  private item: any[];
  public package: Package = new Package();
  public photoShoot: PhotoShoot = new PhotoShoot('', '', '', '', null, '');
  public curStep: number;

  constructor(private httpClient: HttpClient) {}

  addItem(data: any): void {
    this.item.push(data);
  }

  getItem(): any {
    return this.item;
  }

  setPhotoShoot(shoot: PhotoShoot): void {
    this.photoShoot.meetingPlace = shoot.meetingPlace;
    this.photoShoot.meetingPlaceDetail = shoot.meetingPlaceDetail;
    this.photoShoot.shootDate = shoot.shootDate;
    this.photoShoot.shootTime = shoot.shootTime;
    this.photoShoot.additionalInfo = shoot.additionalInfo;
    this.photoShoot.additionalService = shoot.additionalService;
  }

  getAllOptions(): Observable<any> {
    return this.httpClient.get(this.optionUrl + 'all');
  }

  bookPhotoShoot(photoshoot: PhotoShoot): Observable<any> {
    return this.httpClient.post(this.bookingUrl, photoshoot);
  }
}
