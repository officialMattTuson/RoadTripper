import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, take } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AvailabilityPopupComponent } from 'src/app/components/availability-popup/availability-popup.component';
import { BookingRequestCarAndLocation, Location, SelectButtonOption } from 'src/app/interfaces/interfaces';
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

  constructor(
    private readonly urlService: UrlService,
    private readonly appService: AppService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPreviousUrl();
    this.getLocations();
    this.getCategoryNames();
  }

  getPreviousUrl(): void {
    this.urlService.previousUrl$.pipe(take(1)).subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }

  getLocations(): void {
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

  setInitialFilteredLocations(locations: Location[]): void {
    locations.forEach((location) => {
      if (location.country === 'New Zealand') {
        this.locationsSelected.push(location);
      }
    });
    this.currentSearchFilters.push('New Zealand');
    this.locationsSelected = this.sortLocationsByCountry(this.currentSearchFilters);
  }

  sortLocationsByCountry(selectedCountries: string[]): Location[] {
    const locationsSelected: Location[] = [];
    this.locationsList.map((location) => {
      if (selectedCountries.indexOf(location.country) > -1) {
        locationsSelected.push(location);
      }
    });
    this.currentSearchFilters = selectedCountries;
    return locationsSelected;
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

  showLocationsComingSoon(): Location[] {
    const locationsSelected: Location[] = [];
    this.locationsList.map((location) => {
      if (!location.isFinalized) {
        locationsSelected.push(location);
      }
    });
    return locationsSelected;
  }

  getCategoryNames(): void {
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

  onFilterChange(selectedFilters: string[]): void {
    this.currentSearchFilters = selectedFilters;
    if (selectedFilters.length === 0) {
      this.locationsSelected = this.showLocationsComingSoon();
      return;
    }
    this.locationsSelected = this.sortLocationsByCountry(selectedFilters);
  }

  openAvailabilityPopup(location: Location): void {
    const dialogRef = this.dialog.open(AvailabilityPopupComponent, {
      data: location,
    });
    dialogRef.afterClosed().subscribe((result: BookingRequestCarAndLocation) => {
      if (!result) {
        return;
      }
      
      console.log(result);
      

    });
  }
}
