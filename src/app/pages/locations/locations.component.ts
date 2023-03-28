import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, combineLatest, EMPTY, map, Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Location } from 'src/app/interfaces/interfaces';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {

  countriesSettled = new Set();
  categories!: string[];
  
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

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private urlService: UrlService,
              private appService: AppService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.getPreviousUrl();
    this.titleService.setTitle('Locations');
    this.locationsWithMappedCategories$ = this.getLocations();
    this.locationsWithMappedCategories$.subscribe((locations) => {
    this.countriesSettled = new Set(locations.map(location => location.country));
  });
    this.getCategoryNames();
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
