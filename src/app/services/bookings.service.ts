import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingRequestCarAndLocation } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private _bookingRequest = new BehaviorSubject<
    BookingRequestCarAndLocation | object
  >({});
  public bookingRequest$ = this._bookingRequest.asObservable();

  setBookingRequest(bookingRequest: BookingRequestCarAndLocation) {
    this._bookingRequest.next(bookingRequest);
  }
}
