import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  previousUrlString = '';
  currentUrl = window.location.href;

  constructor(public location: Location) {
  }
  ngOnInit(): void {
  }

}
