import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, combineLatest, EMPTY, map, Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Car } from 'src/app/interfaces/interfaces';
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

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private urlService: UrlService,
              private router: Router,
              private appService: AppService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.getPreviousUrl();
    this.setBackButtonTitle();
    this.carDetails$ = this.getCarDetails();
    this.carDetails$.subscribe();
    this.titleService.setTitle('Our Fleet');
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  
}
