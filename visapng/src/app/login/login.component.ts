import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'vis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * login component class
 */
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm: FormGroup;
  forgotPwdForm: FormGroup;
  submitted = false;
  invalid = false;
  loginContainer = true;
  forgotContainer = false;
  invalidEmail = false;
  message: any;

  constructor(logger: LoggerService, private fb: FormBuilder,
    private authService: AuthService, private router: Router) {
    super(logger);

    // validation for login page
    this.loginForm = fb.group({
      'username': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(255)])),
      'password': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(255)]))
    });

    // forgot password form fields.
    this.forgotPwdForm = fb.group({
      'email': new FormControl(null, Validators.compose([Validators.required, Validators.email]))
    });
  }

  ngOnInit() {
    if (sessionStorage.getItem('authT') !== null) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Enable login form and disables the forgot form.
   */
  login() {
    this.loginContainer = true;
    this.forgotContainer = false;
  }

  /**
  * This method will invoke the authservice to check the user is valid or not.
  * @param form.
  */
  onSubmit(data) {

    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.validate(data.username, data.password).subscribe(result => {
        if (result === true) {
          this.router.navigate(['/gallery']);
        } else {
          this.invalid = true;
        }
      });
    }
  }

  /**
   * Enable forget password form and disables the login form.
   */
  forgotForm() {
    this.loginContainer = false;
    this.forgotContainer = true;
  }

  /**
   * Reset password link has been sent,if this email has been registered with us.
   * @param data // form data.
   */
  forgetPwd(data) {

    this.submitted = true;
    if (this.forgotPwdForm.valid) {
      this.authService.forgotPwd(data.email).subscribe(res => {
        this.invalidEmail = true;
        this.message = res;
      }, error => {
        this.invalidEmail = true;
        this.message = error.json();
      });
    }
  }

  aboutUs() {
    this.router.navigate(['/about-us']);
  }

}
