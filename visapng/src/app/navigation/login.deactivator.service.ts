import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { LoginComponent } from '../login/login.component';
 

@Injectable()
export class NavigateAwayFromLoginDeactivatorService implements CanDeactivate<LoginComponent> {

  constructor() {  }

  canDeactivate(target: LoginComponent) {
    return true;
  }
}
