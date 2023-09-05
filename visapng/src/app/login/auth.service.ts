import { Injectable, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { LoggerService } from '../logger/logger.service';
import { HttpClientService } from '../common/http-client.service';
import { BaseService } from '../common/base.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class AuthService extends BaseService {

  userData: any;
  isLoggedIn = false;
  logIn$: Subject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);
  externalBS;

  /**
   * Constructor to call base class to invoke logger service and http services
   * @param logger
   * @param httpClient
   */
  constructor(logger: LoggerService, httpClient: HttpClientService, private cookieService?: CookieService) {
    super(logger, httpClient);

    this.logIn$.asObservable();
    this.externalBS = this.logIn$;
  }

  /**
   * validate the user and get the token
   * @param username
   * @param password
   */
  validate(username, password) {
    const dataObj = {
      userName: username,
      pwd: password
    };

    return this.httpClient.auth(this.ViSAP.config.workspaceUrl, JSON.stringify(dataObj))
      .map((response: Response) => {
        this.userData = response;
        if (this.userData !== '') {
          sessionStorage.setItem('authT', this.userData.userToken);
          // cookie need to set to validate video token while playing video
          this.cookieService.set('authToken', this.userData.userToken, null, '/');
          sessionStorage.setItem('loginname', this.userData.userName);
          sessionStorage.setItem('workSpaceName', this.userData.workspaceName);
          sessionStorage.setItem('userRole', this.userData.userRole);
          sessionStorage.setItem('userid', this.userData.userid);
          sessionStorage.setItem('ng', '1');
          this.httpClient.authToken = this.userData.userToken;
          this.isLoggedIn = true;
          this.logIn$.next(this.isLoggedIn);
          return true;
        } else {
          return false;
        }
      }).catch(this.errHandler);

  }

  /**
   *  Reset password link has been sent,if this email has been registered with us.
   * @param emailAddress
   */
  forgotPwd(emailAddress) {
    const dataObj = {
      emailID: 'emailID,',
      emailAddress: emailAddress,
      ng: true
    };

    return this.httpClient.auth(this.ViSAP.config.email, JSON.stringify(dataObj))
      .map((response: Response) => {
        return response;
      }).catch(this.errHandler);
  }

  /**
   * Resets the password if token is valid.
   * @param data
   */
  resetPwd(data) {
    data.ng = true;
    return this.httpClient.auth(this.ViSAP.config.reset, JSON.stringify(data))
      .map((response: Response) => {
        return response;
      }).catch(this.errHandler);
  }

  errHandler(error: Response): any {
    return Observable.throw(error || 'Error in fetching data');
  }


  /**
   * check user has logged in or not
   */
  checkLogin() {
    if (sessionStorage.getItem('authT') !== null) {
      this.isLoggedIn = true;
    }
    return this.externalBS.asObservable().startWith(this.isLoggedIn);
  }

}

