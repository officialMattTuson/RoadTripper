import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, take } from 'rxjs';
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
  locationsWithMappedCategories$!: Observable<Location[]>;
  currentSearchFilters: string[] = [];

  previousUrlString = '';
  currentUrl = window.location.href;

  locations$ = this.appService.getLocations();
  categories$ = this.appService.getCategories();

  constructor(
    private urlService: UrlService,
    private appService: AppService,
  ) {}

  ngOnInit(): void {
    this.getPreviousUrl();
    this.locationsWithMappedCategories$ = this.getLocations();
    this.getCountries();
    this.getCategoryNames();
    this.setSelectedLocations();
  }

  getPreviousUrl() {
    this.urlService.previousUrl$.pipe(take(1)).subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }

  getLocations(): Observable<Location[]> {
    return combineLatest([this.locations$, this.categories$]).pipe(
      take(1),
      map(([locations, categories]) =>
        locations.map((location) => ({
          ...location,
          category: categories.find(
            (category) => category.id === location.categoryId
          )?.name,
        }))
      )
    );
  }

  getCountries() {
    this.locationsWithMappedCategories$.pipe(take(1)).subscribe((locations) => {
      this.countriesList = new Set(
        locations.map((location) => location.country)
      );
      const countriesListArray = Array.from(this.countriesList) as string[];
      this.countriesSettled = this.setCountryFilter(countriesListArray);
    });
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

  setSelectedLocations() {
    this.locationsWithMappedCategories$.pipe(take(1)).subscribe((locations) => {
      locations.map((location) => {
        if (location.country === 'New Zealand') {
          this.locationsSelected.push(location);
        }
      });
      this.currentSearchFilters.push('New Zealand');
      return this.locationsSelected;
    });
  }

  showLocationsComingSoon() {
    this.locationsSelected = [];
    this.locationsWithMappedCategories$.pipe(take(1)).subscribe((locations) => {
      locations.map((location) => {
        if (!location.isFinalized) {
          this.locationsSelected.push(location);
        }
      });
      return this.locationsSelected;
    });
  }

  sortLocationsByCountry(selectedCountries: string[]) {
    this.locationsSelected = [];
    this.locationsWithMappedCategories$.pipe(take(1)).subscribe((locations) => {
      locations.map((location) => {
        if (selectedCountries.indexOf(location.country) > -1) {
          this.locationsSelected.push(location);
        }
      });
      this.currentSearchFilters = selectedCountries;
      return this.locationsSelected;
    });
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
