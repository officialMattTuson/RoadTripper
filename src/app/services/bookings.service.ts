import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingRequestCarAndLocation } from '../interfaces/interfaces';
import { initialBookingState } from '../data/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private _bookingRequest = new BehaviorSubject<BookingRequestCarAndLocation>(initialBookingState);
  public bookingRequest$ = this._bookingRequest.asObservable();

  setBookingRequest(bookingRequest: BookingRequestCarAndLocation) {
    this._bookingRequest.next(bookingRequest);
  }
}
