import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Package } from 'src/app/shared/models/Package';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPackageClick = new EventEmitter<Package>();
  @Input() packageType: number;
  package: Package = new Package();
  priceFormat: string;

  constructor() { }

  ngOnInit(): void {
    if (this.packageType === 1) {
      this.package.name = '1 Hour Photo Shoot';
      this.package.price = 500000;
      this.package.duration = '1';
      this.package.editPhotos = '40';
      this.package.downloadPhotos = '20';
    }
    else if (this.packageType === 2){
      this.package.name = '2 Hour Photo Shoot';
      this.package.price = 1000000;
      this.package.duration = '2';
      this.package.editPhotos = '100';
      this.package.downloadPhotos = '40';
    }
    else {
      this.package.name = 'Full-Day Photo Shoot';
      this.package.price = 3000000;
      this.package.duration = '8';
      this.package.editPhotos = 'All';
      this.package.downloadPhotos = 'All';
    }

    this.priceFormat = new Intl.NumberFormat('vi-VN', {maximumSignificantDigits: 3}).format(this.package.price);
  }

  onSelectPackage(): void {
    this.onPackageClick.emit(this.package);
  }
}
