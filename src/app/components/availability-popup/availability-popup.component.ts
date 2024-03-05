import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { Car } from 'src/app/interfaces/interfaces';
import { CarsService } from 'src/app/services/cars-service';

@Component({
  selector: 'app-availability-popup',
  templateUrl: './availability-popup.component.html',
  styleUrls: ['./availability-popup.component.scss'],
})
export class AvailabilityPopupComponent implements OnInit {
  availableCars: Car[] = [];
  carDetails$ = this.carsService.carDetails$;

  constructor(
    public dialogRef: MatDialogRef<AvailabilityPopupComponent>,
    private readonly appService: AppService,
    private readonly carsService: CarsService,
    @Inject(MAT_DIALOG_DATA) public data: Location
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.carDetails$.subscribe((cars) => console.log(cars));
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
