import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-car-hire',
  templateUrl: './car-hire.component.html',
  styleUrls: ['./car-hire.component.scss']
})
export class CarHireComponent implements OnInit {

  backButtonTitle = '';
  previousUrlString!: string;
  currentUrl = window.location.href

  constructor(private urlService: UrlService,
              private router: Router) { }

  ngOnInit(): void {
    this.getPreviousUrl();
    this.setBackButtonTitle();
  }

  getPreviousUrl() {
    this.urlService.previousUrl$.subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }

  setBackButtonTitle() {
    this.previousUrlString?.includes('locations')
    ? this.backButtonTitle = 'Locations'
    : this.backButtonTitle = 'Return Home';
  }

  onBackNavigation() {
    this.backButtonTitle === 'Locations'
    ? this.router.navigateByUrl('locations')
    : this.router.navigateByUrl('home')
  }
}
