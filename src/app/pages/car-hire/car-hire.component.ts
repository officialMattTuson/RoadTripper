import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, combineLatest, EMPTY, map, Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Car, SelectButtonOption } from 'src/app/interfaces/interfaces';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-car-hire',
  templateUrl: './car-hire.component.html',
  styleUrls: ['./car-hire.component.scss']
})
export class CarHireComponent implements OnInit, OnDestroy {

  backButtonTitle = '';
  previousUrlString!: string;
  currentUrl = window.location.href;
  
  cars$ = this.appService.getAllCars().pipe(catchError(error => {
    console.log(error)
    return EMPTY;
  }));

  carTypes$ = this.appService.getCarTypes().pipe(catchError(error => {
    console.log(error)
    return EMPTY;
  }));

  fuelCategories$ = this.appService.getFuelCategories().pipe(catchError(error => {
    console.log(error)
    return EMPTY;
  }));

  fuelClasses$ = this.appService.getFuelClass().pipe(catchError(error => {
    console.log(error)
    return EMPTY;
  }));

  experienceTypes$ = this.appService.getExperienceTypes().pipe(catchError(error => {
    console.log(error)
    return EMPTY;
  }));

  transmissions$ = this.appService.getTransmissions().pipe(catchError(error => {
    console.log(error)
    return EMPTY;
  }));

  carDetails$!: Observable<Car[]>;
  searchBarTitle = 'Filter By Fuel Type';
  carListingsByFuelClass = new Set();
  filteredCarList?: SelectButtonOption[];
  currentSearchFilters: string[] = [];
  filteredCarsByFuelType: Car[] =[];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private urlService: UrlService,
              private router: Router,
              private appService: AppService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.appService.searchCarByMakeOrModel('tesla')
    this.getPreviousUrl();
    this.setBackButtonTitle();
    this.carDetails$ = this.getCarDetails();
    this.carDetails$.subscribe();
    this.titleService.setTitle('Our Fleet');
    this.getCarsByFuelType();
    this.setFuelTypes();
  }

  getPreviousUrl() {
    this.urlService.previousUrl$.subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }

  setBackButtonTitle() {
    this.previousUrlString?.includes('locations')
    ? this.backButtonTitle = 'Locations'
    : this.backButtonTitle = 'Return Home';
  }

  onBackNavigation() {
    this.backButtonTitle === 'Locations'
    ? this.router.navigateByUrl('locations')
    : this.router.navigateByUrl('home')
  }

  getCarDetails(): Observable<Car[]> {
    return combineLatest([
      this.cars$,
      this.carTypes$,
      this.fuelCategories$,
      this.fuelClasses$,
      this.experienceTypes$,
      this.transmissions$
    ]).pipe(
      takeUntil(this.destroy$),
      map(([cars, carTypes, fuelCategories, fuelClasses, experienceTypes, transmissions]) => {
        return cars.map(car => ({
          ...car,
          carType: carTypes.find(carType => carType.id === car.bodyType)?.name,
          fuelCategory: fuelCategories.find(category => category.id === car.fuelCategory)?.class,
          fuelClass: fuelClasses.find(fuelClass => fuelClass.id === car.fuelClass)?.name,
          experience: experienceTypes.find(experience => experience.id === car.experience)?.name,
          transmission: transmissions.find(transmission => transmission.id === car.transmission)?.name
        }));
      }),
    );
  }

  getCarsByFuelType() {
    this.carDetails$.subscribe((carDetails) => {
      this.carListingsByFuelClass = new Set(carDetails.map(car => car.fuelClass));
      const carFuelTypes = Array.from(this.carListingsByFuelClass) as string[];
      this.setFuelTypeFilter(carFuelTypes);
    });
  }

  setFuelTypeFilter(fuelTypes: string[]) {
    this.filteredCarList = fuelTypes.map(fuelType => {
      if (fuelType === 'Electric') {
        return {label: fuelType, value: fuelType, checked: true} as SelectButtonOption;
      } 
      return {label: fuelType, value: fuelType, checked: false} as SelectButtonOption;
    });
  }

  setFuelTypes() {
    this.carDetails$.subscribe(carDetails => {
      carDetails.map(car => {
        if (car.fuelClass === 'Electric') {
          this.filteredCarsByFuelType.push(car);
        }
      })
      this.currentSearchFilters.push('New Zealand')
      return this.filteredCarsByFuelType;
    })
  }

  onFilterChange(selectedFilters: string[]) {
    this.currentSearchFilters = selectedFilters;
    this.sortCarsByFuelType(selectedFilters);
  }

  sortCarsByFuelType(selectedFuelTypes: string[]) {
    this.filteredCarsByFuelType = [];
    this.carDetails$.subscribe(carDetails => {
      carDetails.map(car => {   
        if (car.fuelClass === undefined) {
          return;
        }
        if (selectedFuelTypes.indexOf(car.fuelClass) > -1) {
          this.filteredCarsByFuelType.push(car);
        }
      })
      this.currentSearchFilters = selectedFuelTypes;
      return this.filteredCarsByFuelType;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
