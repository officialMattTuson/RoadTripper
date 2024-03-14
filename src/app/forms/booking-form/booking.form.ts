import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  alphaNumericRegex,
  emailRegex,
  maxLengthNameField,
  maxPhoneNumberLength,
  maximumDrivingAge,
  minLengthNameField,
  minimumDrivingAge,
  numericRegex,
  phoneNumberRegex,
} from '../validation-constants';
import { futureDateValidator } from '../custom-validators/future-date-validator';
import { endDateAfterStartDateValidator } from '../custom-validators/booking-end-date-validator';

const getBookingForm = () => {
  const fb = new FormBuilder();
  return fb.group({
    contactName: fb.control('', [
      Validators.required,
      Validators.minLength(minLengthNameField),
      Validators.maxLength(maxLengthNameField),
    ]),
    contactNumber: fb.control('', [
      Validators.required,
      Validators.maxLength(maxPhoneNumberLength),
      Validators.pattern(phoneNumberRegex),
    ]),
    contactEmail: fb.control('', [
      Validators.required,
      Validators.maxLength(maxLengthNameField),
      Validators.pattern(emailRegex),
    ]),
    contactAddress: fb.control('', [
      Validators.required,
      Validators.maxLength(maxLengthNameField),
    ]),
    contactCity: fb.control('', [
      Validators.required,
      Validators.maxLength(maxLengthNameField),
    ]),
    contactCountry: fb.control('', [
      Validators.required,
      Validators.maxLength(maxLengthNameField),
    ]),
    contactRegion: fb.control('', [
      Validators.maxLength(maxLengthNameField),
    ]),
    contactDriversLicenseNumber: fb.control('', [
      Validators.required,
      Validators.pattern(alphaNumericRegex),
    ]),
    contactDriversAge: fb.control('', [
      Validators.required,
      Validators.pattern(numericRegex),
      Validators.min(minimumDrivingAge),
      Validators.max(maximumDrivingAge),
    ]),

    bookingStartDate: fb.control('', [
      Validators.required,
      futureDateValidator(),
    ]),
    bookingEndDate: fb.control('', [
      Validators.required,
      endDateAfterStartDateValidator(),
    ]),
    bookingPickUpLocation: fb.control('', Validators.required),
    isDropOffAndPickUpLocationSame: fb.control('', Validators.required),
    bookingDropOffLocation: fb.control('', Validators.required),
    numberOfAdults: fb.control('', [
      Validators.required,
      Validators.pattern(numericRegex),
      Validators.min(0),
    ]),
    numberOfChildren: fb.control('', [
      Validators.required,
      Validators.pattern(numericRegex),
      Validators.min(0),
    ]),
    numberOfSeniors: fb.control('', [
      Validators.required,
      Validators.pattern(numericRegex),
      Validators.min(0),
    ]),
    numberOfTotalTravelers: fb.control('', [
      Validators.required,
      Validators.pattern(numericRegex),
      Validators.min(1),
    ]),
    selectedCarType: fb.control('', Validators.required),
  });
};

export class BookingForm extends FormGroup {
  constructor() {
    super(getBookingForm().controls);
  }
}
