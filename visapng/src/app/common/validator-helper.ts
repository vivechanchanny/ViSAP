import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';


@Injectable()
export class ValidatorHelper {
    ///This is the guts of Angulars minLength, added a trim for the validation
    static minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (ValidatorHelper.isPresent(Validators.required(control))) {
                return null;
            }
            const v: string = control.value ? control.value : '';
            return v.trim().length < minLength ?
                { 'minlength': { 'requiredLength': minLength, 'actualLength': v.trim().length } } :
                null;
        };
    }

     /**
      * This method will validate max length.
      */
    static maxLength(max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (ValidatorHelper.isPresent(Validators.required(control))) {
                return null;
            }
            const text: string = control.value ? control.value : '';
            if (text.trim().length > max) {
                return { 'maxlength': true };
            }
            return null;
        };
    }

    /**
     *  check whether the number is interger number.
     */
    static isNumberCheck(): ValidatorFn {
        return  (c: AbstractControl): {[key: string]: boolean} | null => {
           const regex = new RegExp('^[0-9]*$');
           if (c.value != null && !regex.test(c.value)) {
            return { 'number': true };
        }
          return null;
        };
      }


    static isPresent(obj: any): boolean {
        return obj !== undefined && obj !== null;
    }

    /**
     * URL validator
     */
    static validateUrl(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (ValidatorHelper.isPresent(Validators.required(control))) {
                return null;
            }
            const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
            if (!pattern.test(control.value)) {
                return { validUrl: true };
            }
            return null;
        };
    }

    /**
 * time format validator
 */
    static validateTimeFormat(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (ValidatorHelper.isPresent(Validators.required(control))) {
                return null;
            }

            if (!control.value.match(/^(\d|\:)+$/)) {
                return { invalidFormat: true };
            }

            if (control.value.includes(':')) {
                const newTime = control.value.split(':');
                for (let i = 0; i < newTime.length; i++) {
                    if (newTime[i].length !== 2 || newTime.length === 1) {
                        if (newTime.length === 3) {
                            return { invalidFormat: true };
                        }
                        return { invalidFormat: true };
                    }
                }
            } else {
                return { invalidFormat: true };
            }
            return null;
        };
    }

    /**
     * validate passwords and confirm password.
     * @param AC // form control
     */
    static MatchPassword(AC: AbstractControl) {

        const password = AC.get('password').value; // to get value in input tag
        const confirmPwd = AC.get('confirmPwd').value; // to get value in input tag

        if (password !== confirmPwd) {
            AC.get('confirmPwd').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }

}
