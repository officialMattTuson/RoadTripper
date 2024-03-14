import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const getBookingForm = () => {
  const fb = new FormBuilder();
  return fb.group({
    contactName: fb.control('', Validators.required),
    contactNumber: fb.control('', [
      Validators.required,
      Validators.maxLength(16),
    ]),
    contactEmail: fb.control('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    contactAddress: fb.control('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    contactDriversLicenseNumber: fb.control('', [Validators.required]),
    contactDriversAge: fb.control('', [
      Validators.required,
      Validators.min(18),
      Validators.max(85),
    ]),

    bookingStartDate: fb.control('', Validators.required),
    bookingEndDate: fb.control('', Validators.required),
    bookingPickUpLocation: fb.control('', Validators.required),
    isDropOffAndPickUpLocationSame: fb.control('', Validators.required),
    bookingDropOffLocation: fb.control('', Validators.required),
    numberOfTravelers: fb.control('', Validators.required),
    selectedCarType: fb.control('', Validators.required),
  });
};

export class BookingForm extends FormGroup {
  constructor() {
    super(getBookingForm().controls);
  }
}
