import { AbstractControl, FormControl } from '@angular/forms';


export function checkDateOfBirth(control: AbstractControl) {
  const dateOfBirth = new Date(control.value);
  const currentDate = new Date();

  if (new Date().getFullYear() - dateOfBirth.getFullYear() < 18 || new Date().getFullYear() - dateOfBirth.getFullYear() > 70) {
    return { checkAge: true };
  }
  return null;
}



