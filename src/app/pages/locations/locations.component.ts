import { Component, OnInit } from '@angular/core';
import { combineLatest, map, take } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Location, SelectButtonOption } from 'src/app/interfaces/interfaces';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  countriesList = new Set();
  countriesSettled: SelectButtonOption[] = [];
  categories!: string[];
  locationsSelected: Location[] = [];
  locationsList: Location[] = [];
  currentSearchFilters: string[] = [];

  previousUrlString = '';
  currentUrl = window.location.href;

  locations$ = this.appService.getLocations();
  categories$ = this.appService.getCategories();

  constructor(private urlService: UrlService, private appService: AppService) {}

  ngOnInit(): void {
    this.getPreviousUrl();
    this.getLocations();
    this.getCategoryNames();
  }

  getPreviousUrl() {
    this.urlService.previousUrl$.pipe(take(1)).subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }

  getLocations() {
    combineLatest([this.locations$, this.categories$])
      .pipe(
        take(1),
        map(([locations, categories]) =>
          locations.map((location) => ({
            ...location,
            category: categories.find(
              (category) => category.id === location.categoryId
            )?.name,
          }))
        )
      )
      .subscribe((locations: Location[]) => {
        this.locationsList = locations;
        this.getCountries(locations);
        this.setInitialFilteredLocations(locations);
      });
  }

  getCountries(locations: Location[]) {
    const countriesList = new Set(
      locations.map((location) => location.country)
    );
    const countriesListArray = Array.from(countriesList);
    this.countriesSettled = this.setCountryFilter(countriesListArray);
  }

  setInitialFilteredLocations(locations: Location[]) {
    locations.forEach((location) => {
      if (location.country === 'New Zealand') {
        this.locationsSelected.push(location);
      }
    });
    this.currentSearchFilters.push('New Zealand');
    this.sortLocationsByCountry(this.currentSearchFilters);
  }

  sortLocationsByCountry(selectedCountries: string[]) {
    this.locationsSelected = [];
    this.locationsList.map((location) => {
      if (selectedCountries.indexOf(location.country) > -1) {
        this.locationsSelected.push(location);
      }
    });
    this.currentSearchFilters = selectedCountries;
    return this.locationsSelected;
  }

  setCountryFilter(countries: string[]): SelectButtonOption[] {
    const countriesSelected = countries.map((country) => {
      return {
        label: country,
        value: country,
        checked: country === 'New Zealand',
      } as SelectButtonOption;
    });
    return countriesSelected;
  }

  showLocationsComingSoon() {
    this.locationsSelected = [];
    this.locationsList.map((location) => {
      if (!location.isFinalized) {
        this.locationsSelected.push(location);
      }
    });
    return this.locationsSelected;
  }

  getCategoryNames() {
    this.categories$
      .pipe(
        take(1),
        map((categories) => {
          const categoryNames = categories.map((category) => category.name);
          return categoryNames;
        })
      )
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  onFilterChange(selectedFilters: string[]) {
    this.currentSearchFilters = selectedFilters;
    if (selectedFilters.length === 0) {
      this.showLocationsComingSoon();
      return;
    }
    this.sortLocationsByCountry(selectedFilters);
  }
}
