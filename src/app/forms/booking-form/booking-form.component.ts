import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BookingForm } from './booking.form';
import { AppService } from 'src/app/app.service';
import { map, startWith, take } from 'rxjs';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent implements OnInit {
  form: FormGroup;
  countries: string[] = [];
  filteredOptions: string[];
  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.form = new BookingForm();
    this.getCountries();
    this.setAutoCompleteOptions();
  }

  getCountries() {
    this.appService
      .getCountries()
      .pipe(take(1))
      .subscribe({
        next: (countries) => {
          const countryNames = countries.map((country) => {
            return country.name.common;
          });
          this.countries = this.sortAlphabetically(countryNames);
        },
      });
  }

  setAutoCompleteOptions() {
    this.countryControl.valueChanges.pipe(startWith('')).subscribe((value) => {
      this.filteredOptions = this._filter(value);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter((country) =>
      country.toLowerCase().includes(filterValue)
    );
  }

  sortAlphabetically(list: string[]): string[] {
    return list.sort((a, b) => a.localeCompare(b));
  }

  get countryControl(): FormControl {
    return this.form.get('contactCountry') as FormControl;
  }
}
