import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  placeholder = 'Search Car By Make or Model';
  carListingsByFuelClass = new Set();
  filteredCarList?: SelectButtonOption[];
  currentSearchFilters: string[] = [];
  filteredCars: Car[] = [];
  searchedCars: Car[] = [];
  searchForm!: FormGroup;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private urlService: UrlService,
              private router: Router,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private titleService: Title) { }

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
    ? this.backButtonTitle = 'Locations'
    : this.backButtonTitle = 'Return Home';
  }

  onBackNavigation() {
    this.backButtonTitle === 'Locations'
    ? this.router.navigateByUrl('locations')
    : this.router.navigateByUrl('home')
  }

  onFilterChange(selectedFilters: string[]) {
    this.currentSearchFilters = selectedFilters;
    this.sortCarsByFuelType(selectedFilters);
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
      this.initializeFilter(carFuelTypes);
    });
  }

  initializeFilter(fuelClasses: string[]) {
    this.setFilteredCars();
    this.filteredCarList = fuelClasses.map(fuelClass => {
      if (fuelClass === 'Electric') {
        return {label: fuelClass, value: fuelClass, checked: true} as SelectButtonOption;
      } 
      return {label: fuelClass, value: fuelClass, checked: false} as SelectButtonOption;
    });
  }

  setFilteredCars() {
    this.carDetails$.subscribe(carDetails => {
      carDetails.map(car => {
        if (car.fuelClass === 'Electric') {
          this.filteredCars.push(car);
        }
      })
      return this.filteredCars;
    })
  }

  onSearchedTerm(searchTerm: string) {
    this.searchedCars = [];
    this.appService.searchCarByMakeOrModel(searchTerm).subscribe({
      next: value => this.searchedCars = value,
      error: error => console.log(error),
      complete: () => this.combineFilterAndSearchList(this.searchedCars)
    })
  }

  combineFilterAndSearchList(cars: Car[]) {
    if (cars.length === 0 || this.filteredCars.length === 0) {
      return this.filteredCars;
    }
    const carMap = new Map(cars.map(car => [car.make + car.model, car]));
    const filteredCarsList = this.filteredCars.filter(car => carMap.has(car.make + car.model));
    this.filteredCars = filteredCarsList;
    return this.filteredCars;
  }

  sortCarsByFuelType(selectedFuelTypes: string[]) {
    this.filteredCars = [];
    this.carDetails$.subscribe(carDetails => {
      carDetails.map(car => {   
        if (car.fuelClass === undefined) {
          return;
        }
        if (selectedFuelTypes.indexOf(car.fuelClass) > -1) {
          this.filteredCars.push(car);
        }
      })
      this.currentSearchFilters = selectedFuelTypes;
      this.combineFilterAndSearchList(this.searchedCars);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
