import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { numericRegex } from '../validation-constants';
import { futureDateValidator } from '../custom-validators/future-date-validator';
import { endDateAfterStartDateValidator } from '../custom-validators/booking-end-date-validator';

const getBookingForm = () => {
  const fb = new FormBuilder();
  return fb.group({
    bookingStartDate: fb.control('', [Validators.required, futureDateValidator()]),
    bookingEndDate: fb.control('', [Validators.required, endDateAfterStartDateValidator()]),
    bookingPickUpLocation: fb.control('', Validators.required),
    isDropOffAndPickUpLocationSame: fb.control('', Validators.required),
    bookingDropOffLocation: fb.control(false, Validators.required),
    numberOfAdults: fb.control(1, [Validators.required, Validators.pattern(numericRegex), Validators.min(0)]),
    numberOfChildren: fb.control('', [Validators.required, Validators.pattern(numericRegex), Validators.min(0)]),
    numberOfSeniors: fb.control('', [Validators.required, Validators.pattern(numericRegex), Validators.min(0)]),
    numberOfTotalTravelers: fb.control({value: 1, disabled: true}, [Validators.required, Validators.pattern(numericRegex), Validators.min(1)]),
    numberOfDrivers: fb.control(1, Validators.required),
    selectedCarType: fb.control('', Validators.required),
    driversContactDetails: fb.array([]),
  });
};

export class BookingForm extends FormGroup {
  constructor() {
    super(getBookingForm().controls);
  }
}
