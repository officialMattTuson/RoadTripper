import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookingRequestCarAndLocation, Location } from 'src/app/interfaces/interfaces';
import { BookingsService } from 'src/app/services/bookings.service';
import { AvailabilityPopupComponent } from '../availability-popup/availability-popup.component';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent {
  @Input() location!: Location;
  @Input() showHideCarouselLocationClass!: object;

  constructor(
    private readonly bookingsService: BookingsService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {
  }

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
