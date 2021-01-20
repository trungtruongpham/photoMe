/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhotoshootService } from './photoshoot.service';

describe('Service: Photoshoot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoshootService]
    });
  });

  it('should ...', inject([PhotoshootService], (service: PhotoshootService) => {
    expect(service).toBeTruthy();
  }));
});
