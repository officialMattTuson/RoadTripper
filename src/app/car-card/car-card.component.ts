import { Component, Input, OnInit } from '@angular/core';
import { BaseCardComponent } from '../base-card/base-card.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookingsService } from '../services/bookings.service';
import { AvailableCarFullModel, Car } from '../interfaces/interfaces';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent extends BaseCardComponent implements OnInit {
  @Input() car!: Car | AvailableCarFullModel;
  @Input() showHideCarouselCarClass!: object;

  hasExecuted: boolean = false;

  constructor(
    protected override readonly bookingsService: BookingsService,
    protected override readonly dialog: MatDialog,
    protected override readonly router: Router
  ) {
    super(bookingsService, dialog, router);
  }

  override ngOnInit(): void {}

  isAvailableCarFullModel(
    car: Car | AvailableCarFullModel
  ): car is AvailableCarFullModel {
    this.hasExecuted = true;
    return (car as AvailableCarFullModel).numberOfCars !== undefined;
  }
}
