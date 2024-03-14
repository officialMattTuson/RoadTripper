import { AbstractControl, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      return { futureDate: true };
    }

    return null;
  };
}
