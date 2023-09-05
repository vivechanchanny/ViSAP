import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
 
import { AuthService } from '../login/auth.service';
import { ValidatorHelper } from '../common/validator-helper';

@Component({
  selector: 'vis-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent extends BaseComponent implements OnInit {

  resetForm: FormGroup;
  submitted = false;
  invalid = false;
  message: any;

  constructor(logger: LoggerService, private fb: FormBuilder,
    private authService: AuthService, private router: Router) {
    super(logger);

    // validation for login page
    this.resetForm = fb.group({
      'password': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(255)])),
      'confirmPwd': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(255)]))
    }, { validator: ValidatorHelper.MatchPassword });
  }

  ngOnInit() {

  }

  /**
   * get usertoken from url.
   */
  getQueryString() {
    const href = window.location.href;
    const reg = new RegExp('[?&]' + 't' + '=([^&#]*)', 'i');
    const string = reg.exec(href);
    return string ? string[1] : null;
  }

 /**
  * This method will validates the password and confirm password.
  * If token is valid,Then it reset's the password.
  * @param data // form data.
  */
  onSubmit(data) {

    this.submitted = true;
    if (this.resetForm.valid) {
      const userToken = this.getQueryString();

    // check userToken.
      if (!userToken) {
        this.invalid = true;
        this.message = 'Token is missing';
        return;
      }

      const dataObj = {
        newPassword: data.password,
        token: userToken,
        ng: true
      };

      this.authService.resetPwd(dataObj).subscribe(res => {
        this.invalid = true;
        this.message = 'Password reset sucessfully.';
      }, error => {
        this.invalid = true;
        this.message = error.json();
      });
    }
  }

  /**
   * Redirects to login page.
   */
  login() {
    this.router.navigate(['/login']);
  }

}
