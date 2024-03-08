import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UrlService } from './services/url.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AppService } from './app.service';
import { CarsService } from './services/cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  previousUrl = 'home';
  currentUrl = '';

  private readonly destroy$ = new Subject();

  constructor(
    private readonly router: Router,
    private readonly carsService: CarsService,
    private readonly urlService: UrlService
  ) {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
        this.urlService.setPreviousUrl(this.previousUrl);
        this.previousUrl = this.currentUrl;
      });
  }
  ngOnInit(): void {
    this.urlService.previousUrl$.subscribe(() => {
      this.currentUrl = window.location.href;
    });
    this.carsService.getCarDetails().subscribe((carDetails) => {
      this.carsService.setCarDetails(carDetails);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
