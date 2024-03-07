import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import {
  AvailableCar,
  AvailableCarFullModel,
  Car,
  Location,
} from 'src/app/interfaces/interfaces';
import { CarsService } from 'src/app/services/cars-service';

@Component({
  selector: 'app-availability-popup',
  templateUrl: './availability-popup.component.html',
  styleUrls: ['./availability-popup.component.scss'],
})
export class AvailabilityPopupComponent implements OnInit {
  availableCars: AvailableCarFullModel[] = [];
  currentIndex: number = 0;
  selectedLocation!: Location;

  constructor(
    public dialogRef: MatDialogRef<AvailabilityPopupComponent>,
    private readonly carsService: CarsService,
    @Inject(MAT_DIALOG_DATA) public data: Location
  ) {}

  ngOnInit(): void {
    this.selectedLocation = this.data;
    this.getCarDetails();
  }

  getCarDetails() {
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

  nextCar(): void {
    if (this.currentIndex < this.availableCars.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevCar(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.availableCars.length - 1;
    }
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
