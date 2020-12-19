import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-booking-steps',
  templateUrl: './booking-steps.component.html',
  styleUrls: ['./booking-steps.component.scss']
})
export class BookingStepsComponent implements OnInit, OnChanges {
  @Input() curStep: number;

  isStep2: boolean;
  isStep3: boolean;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.curStep === 1) {
      this.isStep2 = false;
      this.isStep3 = false;
    }
    if (this.curStep === 2) {
      this.isStep2 = true;
      this.isStep3 = false;
    }
    else if (this.curStep === 3) {
      this.isStep3 = !this.isStep3;
      this.isStep2 = true;
    }
  }

  ngOnInit(): void {

    if (this.curStep === 1) {
      this.isStep2 = false;
      this.isStep3 = false;
    }
  }

}
