import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BookingRequestCarAndLocation } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private _bookingRequest = new Subject<BookingRequestCarAndLocation>();
  public bookingRequest$ = this._bookingRequest.asObservable();

  setBookingRequest(bookingRequest: BookingRequestCarAndLocation) {
    this._bookingRequest.next(bookingRequest);
  }
}
