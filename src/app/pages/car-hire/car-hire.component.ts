import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
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
  carIndex = 0;
  
  carDetails!: Car;
  cars!: Car[];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private urlService: UrlService,
              private router: Router,
              private appService: AppService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.getPreviousUrl();
    this.setBackButtonTitle();
    this.getAllCars();
    this.titleService.setTitle('Fleet');
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

  getAllCars() {
    this.appService.getAllCars().pipe(takeUntil(this.destroy$))
    .subscribe({
      next: cars => this.cars = cars,
      error: error => console.error(error),
      complete: () => this.showSelectedCar(this.cars, this.carIndex)
    });
  }

  showSelectedCar(cars: Car[], index: number) {
    this.carDetails = cars[index]
  }

  incrementCarToggle(): void {
    this.carIndex = (this.carIndex + 1) % this.cars.length;
    this.showSelectedCar(this.cars, this.carIndex);
  }

  decrementCarToggle(): void {
    this.carIndex = (this.carIndex - 1 + this.cars.length) % this.cars.length;
    this.showSelectedCar(this.cars, this.carIndex);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  
}
