import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UrlService } from './services/url.service';
import { Subject } from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  previousUrl = 'home';
  currentUrl = '';
  title = 'road-tripper';

  private readonly destroy$ = new Subject();
  
  constructor(private readonly router: Router, private readonly urlService: UrlService) {
    this.router.events
    .pipe(
      takeUntil(this.destroy$),
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      this.urlService.setPreviousUrl(this.previousUrl);
      this.previousUrl = this.currentUrl;
    });

  }
  ngOnInit(): void {
    this.urlService.previousUrl$.subscribe((value) => {
      this.currentUrl = window.location.href
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}



