import { Component, Input, Output, OnInit, EventEmitter, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { BookmarkListService } from './bookmarklist.service';
import { MdMenuModule, MdMenuTrigger } from '@angular/material';

@Component({
  selector: 'vis-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
  providers: [BookmarkListService],
})

export class BookmarkComponent extends BaseComponent implements OnInit {
  tags: any;
  links: any;
  showTags = false;
  showLinks = false;
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  constructor(logger: LoggerService, private listService: BookmarkListService) {
    super(logger);
  }

  ngOnInit() {
  }

  /**
   * Get the current video tags/links
   */
  getBookmark() {
    this.tags = this.listService.getTags();
    this.links = this.listService.getLinks();
    this.showTags = ((this.tags !== undefined && this.tags.length > 0 ) ? true : false);
    this.showLinks = ((this.links !== undefined && this.links.length > 0 ) ? true : false);
  }

  /**
   * Get the time format in hh:mm:ss format
   * @param seconds: time in seconds
   */
  getTimeFormat(seconds) {
    return this.ViSAP.getTimeFormat(seconds);
  }

  /**
   * Play the video at the perticular time
   * @param time :time in seconds
   */
  playTag(time: any) {
    this.ViSAP.playAt(time.t);

  }

  /**
   * Navigate url to link
   * @param url
   */
  onNavigate(url) {
    window.open(url, '_blank');
}

}
