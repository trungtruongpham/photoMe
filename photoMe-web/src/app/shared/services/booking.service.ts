import { Injectable } from '@angular/core';
import { Package } from '../models/Package';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private item: any[];
  public package: Package = new Package();

  constructor() { }

  addItem(data: any): void {
    this.item.push(data);
  }

  getItem(): any {
    return this.item;
  }
}
