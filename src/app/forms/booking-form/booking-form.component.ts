import { Component, OnInit } from '@angular/core';
import { BookingForm } from './booking.form';
import { SharedFormComponent } from '../shared-form/shared-form.component';
import { FormArray, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { ContactForm } from '../contact-form/contact.form';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent extends SharedFormComponent implements OnInit {
  ngOnInit(): void {
    this.form = new BookingForm();
    this.observeNumberOfDrivers();
  }

  observeNumberOfDrivers(): void {
    this.numberOfDriversControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.driversDetailsArray.push(new ContactForm());
    });
  }

  get numberOfDriversControl(): FormControl {
    return this.form.get('numberOfDrivers') as FormControl;
  }

  get driversDetailsArray(): FormArray {
    return this.form.get('driversContactDetails') as FormArray;
  }
}
