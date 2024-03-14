import { Injectable } from '@angular/core';
import { Location } from '../interfaces/interfaces';
import { BehaviorSubject, Observable, combineLatest, map, take } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private _locations = new BehaviorSubject<Location[]>([]);
  public locations$ = this._locations.asObservable();

  locationDetails$ = this.appService.getLocations();
  categories$ = this.appService.getCategories();

  constructor(private readonly appService: AppService) {}

  setLocations(locations: Location[]) {
    this._locations.next(locations);
  }

  getLocations(): Observable<Location[]> {
    return combineLatest([this.locationDetails$, this.categories$]).pipe(
      take(1),
      map(([locations, categories]) =>
        locations.map((location) => ({
          ...location,
          category: categories.find(
            (category) => category.id === location.categoryId
          )?.name,
        }))
      )
    );
  }

  getCategoryNames(): void {
    this.categories$
      .pipe(
        take(1),
        map((categories) => {
          const categoryNames = categories.map((category) => category.name);
          return categoryNames;
        })
      )

  }
}
