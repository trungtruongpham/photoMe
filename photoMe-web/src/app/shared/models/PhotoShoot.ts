import { Package } from './Package';

export class PhotoShoot {
  package: Package;
  location: string;
  price: number;
  shootTime: string;
  shootDate: Date;
  meetingPlace: string;
  meetingPlaceDetail: string;
  additionalInfo: string;
  modelId: string;
  photographerId: string;
  additionalService: string;
  paymentMethod: string;
  modelName: string;
  photographerName: string;
  status: string;

  constructor(
    addtionalInfo: string,
    addtionalService: string,
    meetingPlace: string,
    meetingPlaceDetail: string,
    shootDate: Date,
    shootTime: string
  ) {
    this.additionalInfo = addtionalInfo;
    this.additionalService = addtionalService;
    this.meetingPlace = meetingPlace;
    this.meetingPlaceDetail = meetingPlaceDetail;
    this.shootTime = shootTime;
    this.shootDate = shootDate;
  }
}
