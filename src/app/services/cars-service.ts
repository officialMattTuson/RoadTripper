import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, take } from 'rxjs';
import { Car } from '../interfaces/interfaces';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  cars$ = this.appService.getAllCars();
  carTypes$ = this.appService.getCarTypes();
  fuelCategories$ = this.appService.getFuelCategories();
  fuelClasses$ = this.appService.getFuelClass();
  experienceTypes$ = this.appService.getExperienceTypes();
  transmissions$ = this.appService.getTransmissions();

  private _carDetails = new BehaviorSubject<Car[]>([]);
  public carDetails$ = this._carDetails.asObservable();

  constructor(private readonly appService: AppService) {}
  public setCarDetails(carDetails: Car[]) {
    this._carDetails.next(carDetails);
  }

  public getCarDetails(): Observable<Car[]> {
    return combineLatest([
      this.cars$,
      this.carTypes$,
      this.fuelCategories$,
      this.fuelClasses$,
      this.experienceTypes$,
      this.transmissions$,
    ]).pipe(
      take(1),
      map(
        ([
          cars,
          carTypes,
          fuelCategories,
          fuelClasses,
          experienceTypes,
          transmissions,
        ]) => {
          return cars.map((car) => ({
            ...car,
            carType: carTypes.find((carType) => carType.id === car.bodyType)
              ?.name,
            fuelCategory: fuelCategories.find(
              (category) => category.id === car.fuelCategory
            )?.class,
            fuelClass: fuelClasses.find(
              (fuelClass) => fuelClass.id === car.fuelClass
            )?.name,
            experience: experienceTypes.find(
              (experience) => experience.id === car.experience
            )?.name,
            transmission: transmissions.find(
              (transmission) => transmission.id === car.transmission
            )?.name,
          }));
        }
      )
    );
  }
}
