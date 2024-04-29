import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { isMoment } from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
})
export class SharedFormComponent {
  form: FormGroup;

  destroy$ = new Subject<boolean>();

  convertMomentToString(formControlName: string, form = this.form): void {
    const control = form.get(formControlName);
    if (control && isMoment(control.value)) {
      control.setValue(control.value.toISOString());
    }
  }

  sortAlphabetically(list: string[]): string[] {
    return list.sort((a, b) => a.localeCompare(b));
  }

  getErrorMessage(formControlName: string, formDisplayName: string, form: AbstractControl = this.form): string | null {
    const formControl = form.get(formControlName) as FormControl;
    switch (true) {
      case formControl.hasError('maxlength'):
        return `This field must not exceed ${(formControl.errors as ValidationErrors)['maxlength'].requiredLength} characters (currently ${
          (formControl.errors as ValidationErrors)['maxlength'].actualLength
        }).`;

      case formControl.hasError('minlength'):
        return `This field requires more than ${(formControl.errors as ValidationErrors)['minlength'].requiredLength} characters (currently ${
          (formControl.errors as ValidationErrors)['minlength'].actualLength
        }).`;

      case formControl.hasError('max'):
        return `${this.sentenceCase(formDisplayName)} cannot be greater than ${(formControl.errors as ValidationErrors)['max']}.`;

      case formControl.hasError('min'):
        return `${this.sentenceCase(formDisplayName)} cannot be less than ${(formControl.errors as ValidationErrors)['min']}.`;

      case formControl.hasError('pastDate'):
        return `${this.sentenceCase(formDisplayName)} cannot be in the future.`;

      case formControl.hasError('pattern'):
      case formControl.hasError('matDatepickerParse'):
        return `Please enter a valid ${formDisplayName.toLowerCase()}.`;

      case formControl.hasError('required'):
        if (formControl.touched) {
          return `${formDisplayName} is required.`;
        } else {
          return null;
        }

      case formControl.hasError('unitsSoldError'):
        return 'Number of units sold cannot be greater than total number of units.';

      default:
        return null;
    }
  }

  sentenceCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
