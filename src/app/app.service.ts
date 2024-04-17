import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import {
  getAllCarDetails,
  getCarTypes,
  getExperienceTypes,
  getFuelCategories,
  getFuelClass,
  getTransmissions,
  mockCarDetails,
  searchCarInventory,
} from './data/car';
import {
  getCategories,
  getLocations,
  getRandomLocation,
} from './data/locations';
import {
  Car,
  CarType,
  Category,
  ExperienceType,
  FuelCategory,
  FuelClass,
  Location,
  Transmission,
} from './interfaces/interfaces';
import { Country } from './interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {}

  //  Cars
  getRandomCar(): Observable<Car> {
    return of(mockCarDetails()).pipe(take(1), delay(2000));
  }

  getAllCars(): Observable<Car[]> {
    return of(getAllCarDetails()).pipe(take(1));
  }

  getCarTypes(): Observable<CarType[]> {
    return of(getCarTypes()).pipe(take(1));
  }

  getFuelCategories(): Observable<FuelCategory[]> {
    return of(getFuelCategories()).pipe(take(1));
  }

  getFuelClass(): Observable<FuelClass[]> {
    return of(getFuelClass()).pipe(take(1));
  }

  getExperienceTypes(): Observable<ExperienceType[]> {
    return of(getExperienceTypes()).pipe(take(1));
  }

  getTransmissions(): Observable<Transmission[]> {
    return of(getTransmissions()).pipe(take(1));
  }

  searchCarByMakeOrModel(phrase: string): Observable<Car[]> {
    return of(searchCarInventory(phrase)).pipe(take(1));
  }

  //  Locations

  getLocations(): Observable<Location[]> {
    return of(getLocations()).pipe(take(1));
  }

  getRandomLocation(): Observable<Location> {
    return of(getRandomLocation()).pipe(take(1), delay(1000));
  }

  //  Categories

  getCategories(): Observable<Category[]> {
    return of(getCategories()).pipe(take(1));
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all');
  }
}
