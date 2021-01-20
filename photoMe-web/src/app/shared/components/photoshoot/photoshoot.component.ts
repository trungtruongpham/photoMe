import { Component, Input, OnInit } from '@angular/core';
import { PhotoShoot } from '../../models/PhotoShoot';

@Component({
  selector: 'app-photoshoot',
  templateUrl: './photoshoot.component.html',
  styleUrls: ['./photoshoot.component.scss']
})
export class PhotoshootComponent implements OnInit {

  @Input() photoShoot: PhotoShoot;

  constructor() { }

  ngOnInit(): void {
  }

}
