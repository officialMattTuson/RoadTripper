import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseCardComponent } from 'src/app/base-card/base-card.component';
import { Location } from 'src/app/interfaces/interfaces';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent extends BaseCardComponent implements OnInit {
  @Input() location!: Location;

  constructor(
    protected override readonly bookingsService: BookingsService,
    protected override readonly dialog: MatDialog,
    protected override readonly router: Router
  ) {
    super(bookingsService, dialog, router);
  }

  override ngOnInit(): void {}
}
