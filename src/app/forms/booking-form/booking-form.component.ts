import { Component, Input, OnInit } from '@angular/core';
import { BookingForm } from './booking.form';
import { SharedFormComponent } from '../shared-form/shared-form.component';
import { FormArray, FormControl } from '@angular/forms';
import { map, startWith, take, takeUntil } from 'rxjs';
import { ContactForm } from '../contact-form/contact.form';
import { LocationsService } from 'src/app/services/locations.service';
import { AvailableCarFullModel, Location } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent extends SharedFormComponent implements OnInit {
  @Input() location: Location;
  @Input() car: AvailableCarFullModel;

  minDate = new Date();
  filteredLocations: Location[];

  constructor(private readonly locationService: LocationsService) {
    super();
  }

  ngOnInit(): void {
    this.form = new BookingForm();
    this.pickUpLocationControl.setValue(this.location.name);
    this.pickUpLocationControl.disable();
    this.observeNumberOfDrivers();
    this.observeStartBookingDate();
    this.observeCheckboxValueChange();
    this.locationService.locations$
      .pipe(
        take(1),
        map((locations: Location[]) => {
          return locations.filter((location) => {
            return location.country === this.location.country;
          });
        })
      )
      .subscribe((locations) => {
        this.filteredLocations = locations;
      });
    this.selectedCarControl.patchValue(this.car.transmission);
    this.selectedCarControl.disable();
  }

  observeNumberOfDrivers(): void {
    this.numberOfDriversControl.valueChanges.pipe(startWith(1), takeUntil(this.destroy$)).subscribe((value: number) => {
      if (this.driversDetailsArray.length === value) {
        return;
      }
      if (this.driversDetailsArray.length < value) {
        return this.addRequiredContactControls(value);
      }
      this.removeLatestContactControls(value);
    });
  }

  addRequiredContactControls(value: number): void {
    this.driversDetailsArray.push(new ContactForm());
    if (this.driversDetailsArray.length < value) {
      return this.addRequiredContactControls(value);
    }
  }

  removeLatestContactControls(value: number): void {
    this.driversDetailsArray.removeAt(-1);
    if (this.driversDetailsArray.length > value) {
      return this.removeLatestContactControls(value);
    }
  }

  observeStartBookingDate(): void {
    this.bookingStartDateControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.bookingEndDateControl.updateValueAndValidity();
    });
  }

  observeCheckboxValueChange(): void {
    this.dropOffPickUpSameLocationControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: boolean) => {
      if (value) {
        this.dropOffLocationControl.patchValue(this.pickUpLocationControl.value);
        this.dropOffLocationControl.disable();
      } else {
        this.dropOffLocationControl.enable();
      }
    });
  }

  returnSumOfArray(values: number[]): number {
    return values.reduce((acc, cv) => acc + cv, 0);
  }

  get numberOfDriversControl(): FormControl {
    return this.form.get('numberOfDrivers') as FormControl;
  }

  get bookingStartDateControl(): FormControl {
    return this.form.get('bookingStartDate') as FormControl;
  }

  get dropOffLocationControl(): FormControl {
    return this.form.get('bookingDropOffLocation') as FormControl;
  }

  get pickUpLocationControl(): FormControl {
    return this.form.get('bookingPickUpLocation') as FormControl;
  }

  get bookingEndDateControl(): FormControl {
    return this.form.get('bookingEndDate') as FormControl;
  }

  get selectedCarControl(): FormControl {
    return this.form.get('selectedCarType') as FormControl;
  }

  get dropOffPickUpSameLocationControl(): FormControl {
    return this.form.get('isDropOffAndPickUpLocationSame') as FormControl;
  }

  get driversDetailsArray(): FormArray {
    return this.form.get('driversContactDetails') as FormArray;
  }
}
