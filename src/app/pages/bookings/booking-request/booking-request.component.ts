import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initialBookingState } from 'src/app/data/booking.model';
import { BookingRequestCarAndLocation } from 'src/app/interfaces/interfaces';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.scss'],
})
export class BookingRequestComponent implements OnInit {
  bookingRequest$ = this.bookingsService.bookingRequest$;
  bookingRequest!: BookingRequestCarAndLocation;

  constructor(
    private readonly bookingsService: BookingsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getBookingRequest();
  }

  getBookingRequest() {
    this.bookingRequest$.subscribe((bookingRequest) => {
      this.bookingRequest = bookingRequest;
      if (bookingRequest === initialBookingState) {
        this.router.navigateByUrl('/home');
      }
    });
  }
}
