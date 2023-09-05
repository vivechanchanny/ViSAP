import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdTooltipModule } from '@angular/material';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'vis-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchValue: string = null;
  isValueTyped= false;
  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit() {
    this.clearTxt();
  }

  /**
   * clear text when switching from one tab to another tab. 
   */
  clearTxt() {
    this.router.events.subscribe((event) => {
        this.searchValue = '';
    });
  }

  /**
   * clears text and load the videos.
   */
  clear() {
    this.searchValue = '';
    this.search(this.searchValue);
    this.isValueTyped = false;
  }

  /**
   *  search video by title/tag/category/caption by search key.
   * @param searchkey to search the viedo by search key.
   */
  search(searchkey) {
    this.searchService.search(searchkey.trim());
  }

/**
 * On enter of the textbox to enable the clear button
 * @param value
 */
  enableClearButton(value) {
     if (value.trim() !== '') {
          this.isValueTyped = true;
     }else {
      this.isValueTyped = false;
     }
  }

}
