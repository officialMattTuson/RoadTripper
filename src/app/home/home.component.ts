import { Component, OnInit } from '@angular/core';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  previousUrlString = ''
  currentUrl = window.location.href

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.getPreviousUrl();
  }

  getPreviousUrl() {
    this.urlService.previousUrl$.subscribe((previousUrl) => {
      this.previousUrlString = previousUrl;
    });
  }
}
