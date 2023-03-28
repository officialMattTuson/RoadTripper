import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { getAllCarDetails, mockCarDetails } from './data/car';
import { getCategories, getLocations, getRandomLocation } from './data/locations';
import { Car, Category, Location } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  //  Cars
  getRandomCar(): Observable<Car> {
    return of(mockCarDetails()).pipe(take(1), delay(2000));
  }

  getAllCars(): Observable<Car[]> {
    return of(getAllCarDetails()).pipe(take(1));
  }

  //  Locations

  getLocations(): Observable<Location[]> {
    return of(getLocations()).pipe(take(1));
  }

  getRandomLocation(): Observable<Location> {
    return of(getRandomLocation()).pipe(take(1), delay(1000))
  }

  //  Categories

  getCategories(): Observable<Category[]> {
    return of(getCategories()).pipe(take(1))
  }

}
