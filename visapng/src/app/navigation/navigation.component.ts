import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MdDialog } from '@angular/material';

import { ActionService } from '../common/action.service';
import { RouteInfo } from '../common/route-info.service';
import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ImportComponent } from '../import/import.component';
import { ValueProvider } from '@angular/core/src/di/provider';
import { AuthService } from '../login/auth.service';
import { MessageService } from '../common/message.service';
import { SearchService } from '../search/search.service';
import { SearchComponent } from '../search/search.component';

import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'vis-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent  extends BaseComponent implements OnInit {

  toolbarVisible = false;
  dialogResult = '';
  userName: string;
  workspaceName: string;
  role;
  userRole = { instructor: '3', student: '4' };
  isChildRoute;
  isSearchHidden = false;
  @ViewChild(SearchComponent ) search: SearchComponent;

  constructor(logger: LoggerService, private router: Router, public dialog: MdDialog,
    private routeInfo: RouteInfo, private activatedRoute: ActivatedRoute,
   private authService: AuthService, private messageService: MessageService, private searchService: SearchService) {
      super(logger);

  }

  /**
   * Binds to the Navigation End event of the route, and sets up local properties like isChildRoute
   */
  private bindNavigationEndEvent(): void {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        if (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(e => this.isChildRoute = e.isChildroute);

  }

  ngOnInit() {
    // Bind to the navigation end event to identify properties of the current route
    this.bindNavigationEndEvent();
    this.getAuthDetails();
  }

  /**
   *to clear all user session and returns user back to login page
   */
  logout() {
    sessionStorage.removeItem('authT');
    sessionStorage.removeItem('loginname');
    sessionStorage.removeItem('workSpaceName');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userid');
    this.router.navigate(['login']);
    this.toolbarVisible = false;
  }

  /**
   * This method will invoke when we click on upload(import) tab or button
   * This will block UI and it will popup one dialogue.
   * That dialogue contains the fields to upload video from youtube or from local sytem.
   */
  openDialog() {
    const dialogRef = this.dialog.open(ImportComponent, {
      width: '600px',
      height: '600px',
      data: 'this is dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed:${result}`);
      this.dialogResult = result;
    });
  }

  /**
   * button in selected mode
   * @param url
   */
  isActive(url) {
    this.enableSearch();
    const prevUrl = this.routeInfo.Details.prevUrl;
    const currenturl = this.routeInfo.Details.currentUrl;
    if (this.isChildRoute && prevUrl === url) {
      return true;
    }
  }

  /**
   * Enable the toolbar only if the user has logged in
   */
  getAuthDetails() {
    this.authService.checkLogin()
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.toolbarVisible = true;
          this.role = sessionStorage.getItem('userRole');
          this.userName = sessionStorage.getItem('loginname');
          this.workspaceName = sessionStorage.getItem('workSpaceName');
        }
      });
  }

  /**
   * hide search bar for child routes
   */
  enableSearch() {
    if (this.isChildRoute) {
      this.isSearchHidden = true;
    } else {
      this.isSearchHidden = false;
    }
  }

  /**
   * Create /update group
   */
  group() {
    const url = this.ViSAP.config.groupUrl;

    this.messageService
    .confirm('You will be redirected to different application from here. Do you want to continue ?')
    .subscribe(yes => {
      if (yes) {
        window.open(url, '_blank');
     }
    });
  }

  resetSearch() {
    this.search.searchValue = '';
    this.searchService.search('');
  }

}
