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

const getContactForm = () => {
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
  });
};

export class ContactForm extends FormGroup {
  constructor() {
    super(getContactForm().controls);
  }
}
