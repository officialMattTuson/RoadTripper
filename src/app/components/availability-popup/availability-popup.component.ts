import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import {
  AvailableCarFullModel,
  BookingRequestCarAndLocation,
  Car,
  Location,
} from 'src/app/interfaces/interfaces';
import { CarsService } from 'src/app/services/cars.service';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-availability-popup',
  templateUrl: './availability-popup.component.html',
  styleUrls: ['./availability-popup.component.scss'],
})
export class AvailabilityPopupComponent implements OnInit {
  availableCars: AvailableCarFullModel[] = [];
  availableLocations: Location[] = [];
  currentIndex: number = 0;
  selectedLocation!: Location;
  selectedCar!: Car;

  constructor(
    public dialogRef: MatDialogRef<AvailabilityPopupComponent>,
    private readonly carsService: CarsService,
    private readonly locationsService: LocationsService,
    @Inject(MAT_DIALOG_DATA) public data: Car | Location
  ) {}

  ngOnInit(): void {
    if (this.isDataCarModel(this.data)) {
      this.selectedCar = this.data;
      this.getAvailableLocations();
    } else {
      this.selectedLocation = this.data;
      this.getAvailableCars();
    }
  }

  isDataCarModel(object: Car | Location): object is Car {
    return (this.data as Car).bodyType !== undefined;
  }

  getAvailableLocations(): void {
    this.locationsService.locationDetails$
      .pipe(take(1))
      .subscribe((locations) => {
        locations.forEach((location) => {
          location.carsAvailable?.forEach((car) => {
            if (car.carId === this.selectedCar.id) {
              this.availableLocations.push(location);
            }
          });
        });
        console.log(this.availableLocations);
      });
  }

  getAvailableCars(): void {
    this.carsService.carDetails$.pipe(take(1)).subscribe({
      next: (cars) => {
        cars.map((car) => {
          this.selectedLocation.carsAvailable?.forEach((availableCar) => {
            if (availableCar.carId === car.id) {
              let carObject: AvailableCarFullModel = {
                numberOfCars: availableCar.numberOfCars,
                ...car,
              };
              this.availableCars.push(carObject);
            }
          });
        });
      },
    });
  }

  nextOption(): void {
    const availableOptions =
      this.availableCars.length > 0
        ? this.availableCars
        : this.availableLocations;
    if (this.currentIndex < availableOptions.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  previousOption(): void {
    const availableOptions =
      this.availableCars.length > 0
        ? this.availableCars
        : this.availableLocations;
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = availableOptions.length - 1;
    }
  }

  onsubmitBookingRequest(): void {
    const bookingRequest: BookingRequestCarAndLocation = {
      selectedCar: this.availableCars[this.currentIndex],
      selectedLocation: this.selectedLocation,
    };
    this.closePopup(bookingRequest);
  }

  closePopup(bookingRequest?: BookingRequestCarAndLocation): void {
    if (!bookingRequest) {
      return this.dialogRef.close();
    }
    this.dialogRef.close(bookingRequest);
  }
}
