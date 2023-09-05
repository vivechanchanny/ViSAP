import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { RouteInfo } from './common/route-info.service';


@Component({
  selector: 'vis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private routeInfo: RouteInfo) {

    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .pairwise().subscribe((e: any[]) => {
        this.routeInfo.setRoutes(e[1].url, e[0].url);
      });
  }


}
