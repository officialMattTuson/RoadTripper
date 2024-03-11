import { Component } from '@angular/core';
import { AvailabilityPopupComponent } from '../components/availability-popup/availability-popup.component';
import { BookingRequestCarAndLocation, Location } from '../interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { BookingsService } from '../services/bookings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-card',
  template: '',
})
export class BaseCardComponent {
  constructor(
    protected readonly bookingsService: BookingsService,
    protected readonly dialog: MatDialog,
    protected readonly router: Router
  ) {}

  openAvailabilityPopup(location: Location): void {
    const dialogRef = this.dialog.open(AvailabilityPopupComponent, {
      data: location,
    });
    dialogRef
      .afterClosed()
      .subscribe((result: BookingRequestCarAndLocation) => {
        if (!result) {
          return;
        }
        this.bookingsService.setBookingRequest(result);
        this.router.navigateByUrl('booking');
      });
  }
}
