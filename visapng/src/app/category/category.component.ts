import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { BaseService } from '../common/base.service';
import { LoggerService } from '../logger/logger.service';

@Component({
  selector: 'vis-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseService implements OnInit {

  @Output() vidEvent = new EventEmitter();
  // get category list from video component and load catergories on page load.
  @Input() categoryList: any;
  activeCategory: number = -1;
  anyCategory = true;

  /**
      * Constructor to call base class to invoke logger service and http services
      * @param logger
      * @param httpClient
      */
  constructor(logger: LoggerService, httpClient: HttpClientService) {
    super(logger, httpClient);
  }

  ngOnInit() {
  }

  /**
   * Displaying selected category videos by emiting video event (parent method).
   * @param val selected category value.
   */
  selectedCategory(index, val) {
    this.anyCategory = (val === undefined) ? true : false ;
    this.activeCategory = index;
    this.vidEvent.emit(val);
  }
}
