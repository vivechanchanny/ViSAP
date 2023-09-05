import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

import { HttpClientService } from "../common/http-client.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
/**
 * Protecting the routes using guard
 */
export class AuthGuard implements CanActivate {
  constructor(private router: Router, httpClient: HttpClientService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('authT')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

