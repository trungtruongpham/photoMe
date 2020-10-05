import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostInputComponent } from './new-post-input.component';

describe('NewPostInputComponent', () => {
  let component: NewPostInputComponent;
  let fixture: ComponentFixture<NewPostInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
