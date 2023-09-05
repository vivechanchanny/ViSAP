import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {

  // Observable string sources
  private searchData = new Subject<any>();
  // Observable string streams
  response$ = this.searchData.asObservable();

  constructor() { }

  /**
   * search video by title/tag/category/caption by search key.
   * @param searchKey to search the viedo by search key.
   */
  search(searchKey) {

    // event is triggered and handled in video component.
    this.searchData.next(searchKey);
  }

}
