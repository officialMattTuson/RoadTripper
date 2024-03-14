import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AvailabilityPopupComponent } from 'src/app/components/availability-popup/availability-popup.component';
import {
  BookingRequestCarAndLocation,
  Car,
  SelectButtonOption,
} from 'src/app/interfaces/interfaces';
import { BookingsService } from 'src/app/services/bookings.service';
import { CarsService } from 'src/app/services/cars.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-car-hire',
  templateUrl: './car-hire.component.html',
  styleUrls: ['./car-hire.component.scss'],
})
export class CarHireComponent implements OnInit {
  backButtonTitle = '';
  previousUrlString = '';
  currentUrl = window.location.href;
  carDetails: Car[] = [];
  searchBarTitle = '';
  carFuelTypes: string[] = [];
  filteredCarList?: SelectButtonOption[];
  currentSearchFilters: string[] = [];
  filteredCars: Car[] = [];
  searchedCars: Car[] = [];
  carsMatchingCriteria: Car[] = [];
  searchForm!: FormGroup;

  constructor(
    private readonly urlService: UrlService,
    private readonly router: Router,
    private readonly appService: AppService,
    private readonly bookingsService: BookingsService,
    private readonly carsService: CarsService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPreviousUrl();
    this.setBackButtonTitle();
    this.getCarDetails();
    this.searchForm = this.formBuilder.group({
      searchField: [''],
    });
  }

  getPreviousUrl(): void {
    this.urlService.previousUrl$.subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }

  setBackButtonTitle(): void {
    this.previousUrlString?.includes('locations')
      ? (this.backButtonTitle = 'Locations')
      : (this.backButtonTitle = 'Return Home');
  }

  onBackNavigation(): void {
    this.backButtonTitle === 'Locations'
      ? this.router.navigateByUrl('locations')
      : this.router.navigateByUrl('home');
  }

  onFilterChange(selectedFilters: string[]): void {
    this.currentSearchFilters = selectedFilters;
    this.sortCarsByFuelType(selectedFilters);
  }

  getCarDetails(): void {
    this.carsService.carDetails$.pipe(take(1)).subscribe({
      next: (carDetails) => {
        this.carDetails = carDetails;
        this.carsService.setCarDetails(carDetails);
        this.getCarsByFuelType(carDetails);
      },
    });
  }

  getCarsByFuelType(carDetails: Car[]): void {
    const carListingsByFuelClass = new Set(
      carDetails.map((car) => car.fuelClass)
    );
    this.carFuelTypes = Array.from(carListingsByFuelClass) as string[];
    this.carsMatchingCriteria = this.setFilteredCars(carDetails);
    this.initializeFilter(this.carFuelTypes);
  }

  initializeFilter(fuelClasses: string[]): void {
    this.filteredCarList = fuelClasses.map((fuelClass) => {
      return {
        label: fuelClass,
        value: fuelClass,
        checked: fuelClass === 'Electric',
      } as SelectButtonOption;
    });
  }

  setFilteredCars(carDetails: Car[]): Car[] {
    let matchingCars: Car[] = [];
    carDetails.map((car) => {
      if (car.fuelClass === 'Electric') {
        matchingCars.push(car);
      }
    });
    return matchingCars;
  }

  onSearchedTerm(searchTerm: string): void {
    this.searchedCars = [];
    this.appService
      .searchCarByMakeOrModel(searchTerm)
      .pipe(take(1))
      .subscribe({
        next: (value) => (this.searchedCars = value),
        error: (error) => console.log(error),
        complete: () =>
          this.combineFilterAndSearchList(this.filteredCars, this.searchedCars),
      });
  }

  onResetSearchFilter(): void {
    this.searchedCars = [];
    this.combineFilterAndSearchList(this.filteredCars, this.searchedCars);
  }

  combineFilterAndSearchList(filteredCars: Car[], searchedCars: Car[]): void {
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

  sortCarsByFuelType(selectedFuelTypes: string[]): void {
    if (selectedFuelTypes.length === 0) {
      selectedFuelTypes = this.carFuelTypes;
    }
    this.filteredCars = [];
    this.carDetails.map((car) => {
      if (car.fuelClass === undefined) {
        return;
      }
      if (selectedFuelTypes.indexOf(car.fuelClass) > -1) {
        this.filteredCars.push(car);
      }
    });
    this.currentSearchFilters = selectedFuelTypes;
    this.combineFilterAndSearchList(this.filteredCars, this.searchedCars);
  }

  openLocationsPopup(car: Car): void {
    const dialogRef = this.dialog.open(AvailabilityPopupComponent, {
      data: car,
    });
    dialogRef
      .afterClosed()
      .subscribe((result: BookingRequestCarAndLocation) => {
        if (!result) {
          return;
        }
        this.bookingsService.setBookingRequest(result);
        this.router.navigateByUrl('booking');
      });
  }
}
