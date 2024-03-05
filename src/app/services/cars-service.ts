import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private _carDetails = new BehaviorSubject<Car[]>([]);
  public carDetails$ = this._carDetails.asObservable();

  public setCarDetails(carDetails: Car[]) {
    this._carDetails.next(carDetails);
  }
}
