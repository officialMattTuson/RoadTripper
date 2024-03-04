import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  catchError,
  combineLatest,
  EMPTY,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Car, SelectButtonOption } from 'src/app/interfaces/interfaces';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-car-hire',
  templateUrl: './car-hire.component.html',
  styleUrls: ['./car-hire.component.scss'],
})
export class CarHireComponent implements OnInit, OnDestroy {
  backButtonTitle = '';
  previousUrlString!: string;
  currentUrl = window.location.href;

  cars$ = this.appService.getAllCars().pipe(
    catchError((error) => {
      return EMPTY;
    })
  );

  carTypes$ = this.appService.getCarTypes().pipe(
    catchError((error) => {
      return EMPTY;
    })
  );

  fuelCategories$ = this.appService.getFuelCategories().pipe(
    catchError((error) => {
      return EMPTY;
    })
  );

  fuelClasses$ = this.appService.getFuelClass().pipe(
    catchError((error) => {
      return EMPTY;
    })
  );

  experienceTypes$ = this.appService.getExperienceTypes().pipe(
    catchError((error) => {
      return EMPTY;
    })
  );

  transmissions$ = this.appService.getTransmissions().pipe(
    catchError((error) => {
      return EMPTY;
    })
  );

  carDetails$!: Observable<Car[]>;
  searchBarTitle = 'Filter By Fuel Type';
  placeholder = 'Search Car By Make or Model';
  carFuelTypes: string[] = [];
  filteredCarList?: SelectButtonOption[];
  currentSearchFilters: string[] = [];
  filteredCars: Car[] = [];
  searchedCars: Car[] = [];
  carsMatchingCriteria: Car[] = [];
  searchForm!: FormGroup;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private urlService: UrlService,
    private router: Router,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.getPreviousUrl();
    this.setBackButtonTitle();
    this.carDetails$ = this.getCarDetails();
    this.carDetails$.subscribe();
    this.titleService.setTitle('Our Fleet');
    this.getCarsByFuelType();
    this.searchForm = this.formBuilder.group({
      searchField: [''],
    });
  }

  getPreviousUrl() {
    this.urlService.previousUrl$.subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }

  setBackButtonTitle() {
    this.previousUrlString?.includes('locations')
      ? (this.backButtonTitle = 'Locations')
      : (this.backButtonTitle = 'Return Home');
  }

  onBackNavigation() {
    this.backButtonTitle === 'Locations'
      ? this.router.navigateByUrl('locations')
      : this.router.navigateByUrl('home');
  }

  onFilterChange(selectedFilters: string[]) {
    this.currentSearchFilters = selectedFilters;
    const fuelTypeCount = selectedFilters.length;
    if (fuelTypeCount > 0) {
      this.searchBarTitle =
        fuelTypeCount > 1
          ? `${fuelTypeCount} fuel types selected`
          : selectedFilters.toString();
    }
    this.sortCarsByFuelType(selectedFilters);
  }

  getCarDetails(): Observable<Car[]> {
    return combineLatest([
      this.cars$,
      this.carTypes$,
      this.fuelCategories$,
      this.fuelClasses$,
      this.experienceTypes$,
      this.transmissions$,
    ]).pipe(
      takeUntil(this.destroy$),
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

  getCarsByFuelType() {
    this.carDetails$.subscribe((carDetails) => {
      const carListingsByFuelClass = new Set(
        carDetails.map((car) => car.fuelClass)
      );
      this.carFuelTypes = Array.from(carListingsByFuelClass) as string[];
      this.initializeFilter(this.carFuelTypes);
    });
  }

  initializeFilter(fuelClasses: string[]) {
    this.setFilteredCars();
    this.filteredCarList = fuelClasses.map((fuelClass) => {
      if (fuelClass === 'Electric') {
        return {
          label: fuelClass,
          value: fuelClass,
          checked: true,
        } as SelectButtonOption;
      }
      return {
        label: fuelClass,
        value: fuelClass,
        checked: false,
      } as SelectButtonOption;
    });
  }

  setFilteredCars() {
    this.carDetails$.subscribe((carDetails) => {
      carDetails.map((car) => {
        if (car.fuelClass === 'Electric') {
          this.carsMatchingCriteria.push(car);
        }
      });
      return this.carsMatchingCriteria;
    });
  }

  onSearchedTerm(searchTerm: string) {
    this.searchedCars = [];
    this.appService.searchCarByMakeOrModel(searchTerm).subscribe({
      next: (value) => (this.searchedCars = value),
      error: (error) => console.log(error),
      complete: () =>
        this.combineFilterAndSearchList(this.filteredCars, this.searchedCars),
    });
  }

  onResetSearchFilter() {
    this.searchedCars = [];
    this.combineFilterAndSearchList(this.filteredCars, this.searchedCars);
  }

  combineFilterAndSearchList(filteredCars: Car[], searchedCars: Car[]) {
    switch (true) {
      case searchedCars.length === 0 && filteredCars.length === 0:
        this.carsMatchingCriteria = [];
        break;
      case searchedCars.length === 0:
        this.carsMatchingCriteria = this.getUniqueSet(filteredCars);
        break;
      case filteredCars.length === 0:
        this.carsMatchingCriteria = searchedCars;
        break;
      default:
        this.carsMatchingCriteria = this.getUniqueSet(
          filteredCars,
          searchedCars
        );
        break;
    }
  }

  getUniqueSet(filteredCars: Car[], searchedCars?: Car[]): Car[] {
    const combinedSet = new Set();
    if (searchedCars) {
      const combinedList = filteredCars.filter((car) => {
        return searchedCars.some(
          (searchedCar) => car.make === searchedCar.make
        );
      });
      const uniqueList = combinedList.filter((car) => {
        if (combinedSet.has(car.id)) {
          return false;
        } else {
          combinedSet.add(car.id);
          return true;
        }
      });
      return uniqueList;
    }
    const uniqueList = filteredCars.filter((car) => {
      if (combinedSet.has(car.id)) {
        return false;
      } else {
        combinedSet.add(car.id);
        return true;
      }
    });
    return uniqueList;
  }

  sortCarsByFuelType(selectedFuelTypes: string[]) {
    if (selectedFuelTypes.length === 0) {
      selectedFuelTypes = this.carFuelTypes;
    }
    this.filteredCars = [];
    this.carDetails$.subscribe((carDetails) => {
      carDetails.map((car) => {
        if (car.fuelClass === undefined) {
          return;
        }
        if (selectedFuelTypes.indexOf(car.fuelClass) > -1) {
          this.filteredCars.push(car);
        }
      });
      this.currentSearchFilters = selectedFuelTypes;
      this.combineFilterAndSearchList(this.filteredCars, this.searchedCars);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
