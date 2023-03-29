import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, combineLatest, EMPTY, map, Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Location, SelectButtonOption } from 'src/app/interfaces/interfaces';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {

  countriesList = new Set();
  countriesSettled?: SelectButtonOption[];
  categories!: string[];
  locationsSelected: Location[] = [];
  
  previousUrlString = '';
  currentUrl = window.location.href;

  locations$ = this.appService.getLocations().pipe(catchError(error => {
    console.log(error)
    return EMPTY;
  }));
  categories$ = this.appService.getCategories().pipe(catchError(error => {
    console.log(error)
    return EMPTY;
  }));
  locationsWithMappedCategories$!: Observable<Location[]>;
  currentSearchFilters: string[] = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private urlService: UrlService,
              private appService: AppService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.getPreviousUrl();
    this.titleService.setTitle('Locations');
    this.locationsWithMappedCategories$ = this.getLocations();
    this.getCountries();
    this.getCategoryNames();
    this.setSelectedLocations();
  }

  getPreviousUrl() {
    this.urlService.previousUrl$.subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }

  getLocations(): Observable<Location[]> {
    return combineLatest([this.locations$, this.categories$])
    .pipe(
      takeUntil(this.destroy$),
      map(([locations, categories]) =>
        locations.map(location => ({
          ...location,
          category: categories.find(category => category.id === location.categoryId)?.name
        }))
      )
    );
  }

  getCountries() {
    this.locationsWithMappedCategories$.subscribe((locations) => {
      this.countriesList = new Set(locations.map(location => location.country));
      const countriesListArray = Array.from(this.countriesList) as string[];
      this.setCountryFilter(countriesListArray);
    });
  }

  setCountryFilter(countries: string[]) {
    this.countriesSettled = countries.map(country => {
      if (country === 'New Zealand') {
        return {label: country, value: country, checked: true} as SelectButtonOption;
      } 
      return {label: country, value: country, checked: false} as SelectButtonOption;
    });
  }

  setSelectedLocations() {
    this.locationsWithMappedCategories$.subscribe(locations => {
      locations.map(location => {
        if (location.country === 'New Zealand') {
          this.locationsSelected.push(location);
        }
      })
      this.currentSearchFilters.push('New Zealand')
      return this.locationsSelected;
    })
  }

  showLocationsComingSoon() {
    this.locationsSelected = [];
    this.locationsWithMappedCategories$.subscribe(locations => {
      locations.map(location => {
        if (!location.isFinalized) {
          this.locationsSelected.push(location);
        }
      })
      return this.locationsSelected;
    })
  }

  sortLocationsByCountry(selectedCountries: string[]) {
    this.locationsSelected = [];
    this.locationsWithMappedCategories$.subscribe(locations => {
      locations.map(location => {   
        if (selectedCountries.indexOf(location.country) > -1) {
          this.locationsSelected.push(location);
        }
      })
      this.currentSearchFilters = selectedCountries;
      return this.locationsSelected;
    })
  }

  getCategoryNames() {
    this.categories$.pipe(
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      map(categories => {
        const categoryNames = categories.map(category => category.name);
        return categoryNames;
      })
    ).subscribe(
      categories => this.categories = categories
    )
  }

  onFilterChange(selectedFilters: string[]) {
    this.currentSearchFilters = selectedFilters;
    if (selectedFilters.length === 0) {
      this.showLocationsComingSoon();
      return;
    } 
    this.sortLocationsByCountry(selectedFilters);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
