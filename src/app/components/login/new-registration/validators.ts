import { AbstractControl, UntypedFormControl, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static haveNumber(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveNumber: true };
    };
  }
  static haveStringMay(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveStringMay: true };
    };
  }
  static haveStringMin(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveStringMin: true };
    };
  }
  static haveCharacter(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveCharacter: true };
    };
  }
  static haveSpace(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveSpace: true };
    };
  }
}
export const confirm: ValidatorFn = (
  group: AbstractControl
): { [key: string]: any } | null => {
  let pass = group.get('password') as UntypedFormControl;
  let confirmPass = group.get('passwordConfirm') as UntypedFormControl;

  return pass.value === confirmPass.value ? null : { confirm: true };
};
