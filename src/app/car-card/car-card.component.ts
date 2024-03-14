import { Component, Input } from '@angular/core';
import { AvailableCarFullModel, Car } from '../interfaces/interfaces';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent {
  @Input() car!: Car | AvailableCarFullModel;
  @Input() showHideCarouselCarClass!: object;

  isAvailableCarFullModel(
    car: Car | AvailableCarFullModel
  ): car is AvailableCarFullModel {
    return (car as AvailableCarFullModel).numberOfCars !== undefined;
  }
}
