import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgePackageComponent } from './lodge-package.component';

describe('LodgePackageComponent', () => {
  let component: LodgePackageComponent;
  let fixture: ComponentFixture<LodgePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LodgePackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LodgePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
