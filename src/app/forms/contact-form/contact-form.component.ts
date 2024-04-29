import { Component, Input, OnInit } from '@angular/core';
import { ContactForm } from './contact.form';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedFormComponent } from '../shared-form/shared-form.component';
import { AppService } from 'src/app/app.service';
import { startWith, take } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent extends SharedFormComponent implements OnInit {
  countries: string[] = [];
  filteredOptions: string[];

  @Input() index: number;
  constructor(private readonly appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this.form = new ContactForm();
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
    return this.countries.filter((country) => country.toLowerCase().includes(filterValue));
  }

  get countryControl(): FormControl {
    return this.form.get('contactCountry') as FormControl;
  }
}
