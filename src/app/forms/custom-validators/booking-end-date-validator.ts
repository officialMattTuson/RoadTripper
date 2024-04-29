import { ValidatorFn, AbstractControl } from '@angular/forms';

export function endDateAfterStartDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = control.parent?.get('bookingStartDate')?.value;
    const endDate = control?.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { endDateBeforeStartDate: true };
    }

    return null;
  };
}
