import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityPopupComponent } from './availability-popup.component';

describe('AvailabilityPopupComponent', () => {
  let component: AvailabilityPopupComponent;
  let fixture: ComponentFixture<AvailabilityPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
