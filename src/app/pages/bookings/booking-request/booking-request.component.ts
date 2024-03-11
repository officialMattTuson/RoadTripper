import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private readonly bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.getBookingRequest();
  }

  getBookingRequest() {
    this.bookingRequest$.subscribe((bookingRequest) => {
      this.bookingRequest = bookingRequest as BookingRequestCarAndLocation;
    });
  }
}
