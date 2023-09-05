
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { VideoListService } from './video-list.service';
import { ConfigService } from '../common/config.service';
import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { MessageService } from '../common/message.service';
import { SearchService } from '../search/search.service';
import { ImportComponent } from '../import/import.component';
import { AssignComponent } from '../assign/assign.component';
import { RouteInfo } from '../common/route-info.service';
import { VisapintegrationComponent } from '../visapintegration/visapintegration.component';
declare function unescape(s: string): string;

@Component({
  selector: 'vis-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})

/**
 * Video list component class
 */
export class VideoListComponent extends BaseComponent implements OnInit {
  @Output() playEvent = new EventEmitter();
  sourcelist: any;
  vidList: any;
  errMsg: string;
  configData: any;
  videoId: string;
  isChecked = false;
  @Output() Publish = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() videoIntegration = new EventEmitter<any>();
  @Output() selCheckbxList = new EventEmitter<any>();
  @Input() isStage;
  category: any;
  ismyspacevideo;
  dialogResult;
  videoTitle: Array<any> = [];
  selected: string;
  angularcb = {};
  @ViewChild('publishBtn') publishBtn: ElementRef;
  myForm: FormGroup;
  videoList = [];
  listOfVidIds = [];
  isSinglePublish = false;
  checkBoxArry = [];
  @Input() skipTmLineVideos = false;
  @Input() showActionIcons;
  userId;
  isCollaboration;
  tempVideoSource: any;
  /**
   * Enforcement of logger service :
   * @param videolistService
   * @param config
   * @param logger
   */
  constructor(logger: LoggerService, public dialog: MdDialog, private videolistService: VideoListService,
    private config: ConfigService, private messageService: MessageService, private fb: FormBuilder,
    private searchService: SearchService, private router: Router,
    private routeInfoService: RouteInfo) {
    super(logger);
  }

  /**
   *  After component is initialised:
   */
  ngOnInit() {
    this.logger.info('Info: Fetching List of videos');
    this.isCollaboration = this.routeInfoService.isCollaboration(this.isStage);
    this.loadVideos();
    this.bindEvents();
  }

  /**
   * get the sanapshot of the video to be displayed on thumbnails
   * @param item : check for what type of video
   */
  getSnapSource(item) {
    switch (item.sourcetype) {
      case this.ViSAP.sourceTypeEnum.uploaded:
      case this.ViSAP.sourceTypeEnum.directURL: return this.ViSAP.config.snapshotRepo + item.snap;
      case this.ViSAP.sourceTypeEnum.youtube: return item.snap;
      case this.ViSAP.sourceTypeEnum.timeline:
        return this.setSnapShotForTimeline(item.src[0].data.sourcetype, this.ViSAP.sourceTypeEnum.youtube, item.snap);
      default: return '';
    }
  }

  /**
   * for the timeline video snapshot should be the first snippet snapshot.
   * @param currsrcType :source type of the video which is being played
   * @param srcType :Enum of the video type
   * @param snap : Image
   */
  setSnapShotForTimeline(currsrcType, srcType, snap) {
    let timeLineSnap;
    if (currsrcType === srcType) {
      timeLineSnap = snap;
    } else {
      timeLineSnap = this.ViSAP.config.snapshotRepo + snap;
    }
    return timeLineSnap;

  }

  /**
   * Get the appsettings values like repo/video path to load the thumbnails images
   */
  loadConfig() {
    this.config.loadConfig().subscribe(data => this.configData = data, error => {
      this.errMsg = error;
      this.messageService.showMessages('!!Oops something went wrong', 'Retry', this.loadConfig);
    });
  }

  /**
   * Emit the play event which will be handled by gallery /collaboration / myspace
   * @param source:video source object
   */
  onPlay(source) {
    this.playEvent.emit(source._id);
  }

  /**
 * Gte the image icon for each snapshot
 * @param video:check for what type of video
 */
  getIcon(video) {
    switch (video.sourcetype) {
      case this.ViSAP.sourceTypeEnum.youtube: return 'ind-yt';
      case this.ViSAP.sourceTypeEnum.timeline: return 'ind-tl';
      default: return 'ind-category';
    }
  }

  /**
   * Get the duration for each video
   * @param duration:video duration
   */
  getTime(duration) {
    return this.ViSAP.getTimeFormat(duration);
  }

  /**
   * Load videos
   */
  loadVideos() {
    this.userId = sessionStorage.getItem('userid');
    this.videolistService.getVideos(this.isStage)
      .subscribe(data => {
        this.tempVideoSource = this.sourcelist = data;
        this.vidList = data;
        this.getCategoryList();
        this.sourcelist.forEach(list => {
          this.listOfVidIds.push(list._id);
        });

        this.filterTmLineVideos(data);
      },
      error => {
        this.errMsg = error;
        this.messageService.showMessages('!!Oops something went wrong while loading videos', 'Retry', this.loadVideos);
      });
  }

  private filterTmLineVideos(videoList) {
    if (this.skipTmLineVideos) {
      this.sourcelist = videoList.filter(list => (list.sourcetype !== 2));
    }
  }

  editTmLine(id) {
    this.router.navigate(['timeline', id]);
  }

  // To remove the duplicate category in categorylist
  unqiueCategory(category) {
    for (let i = 0; i < category.length; i++) {
      for (let j = 0; j < category.length; j++) {
        if ((i !== j && i < category.length) && (category[i].toLowerCase() === category[j].toLowerCase())) {
          category[i] = category[i].toLowerCase();
          category.splice(j, 1);
        }
      }
    }
    return category;
  }

  /**
   * get category list from video source.
   */
  getCategoryList() {
    try {
      const categorySrc = [];
      this.category = null;
      this.vidList.forEach(data => {
        data.category.forEach(item => {
          if (item !== '') {   // remove empty data in array.
            categorySrc.push(item);
          }
        });
      });
      this.category = this.unqiueCategory(categorySrc);
    } catch (err) {
      this.messageService.showActionStatus('Ooops something went wrong !!!', 'Retry');
    }
  }

  /**
  * Displaying seleceted category videos.
  * @param val selected catergory value.
  */
  getCategoryVideos(val) {
    try {
      if (val === undefined) {
        this.sourcelist = this.vidList;
        return;
      }
      const categoryList = [];
      let vidId;
      this.vidList.forEach(data => {
        if (data.category !== undefined) {
          data.category.forEach(item => {
            if (val.toLowerCase() === item.toLowerCase() && vidId !== data._id) {
              categoryList.push(data);
              vidId = data._id; // to avoid duplicate data.
            }
          });
        }
      });
      this.sourcelist = categoryList;
    } catch (err) {
      this.messageService.showActionStatus('Ooops something went wrong !!!', 'Retry');
    }
  }

  // binding the events on page load.
  bindEvents() {
    this.searchEvent();
  }

  /**
   * listener event raised by search component.
   * get the video list by search key.
   */
  searchEvent() {
    this.searchService.response$.subscribe(
      (searchKey) => {
        if (searchKey !== '') {
          this.videolistService.searchVideo(searchKey, this.isStage)
            .subscribe(res => {
              this.sourcelist = res;
            }, error => {
              this.messageService.showActionStatus('Ooops something went wrong !!!', 'Retry');
            });
        } else {
          this.sourcelist = this.tempVideoSource;
        }
      }
    );
  }

  /**
 * Below method is added to edit the tittle and desc of the video
 * model popup is shown along with prepopulating the values given at the time of editing.
 * @param title :video title
 * @param desc :video description
 * @param ID :video id
 * @param category :video category
 */
  EditTittleDesc(title, desc, ID) {
    sessionStorage.setItem('videoid', ID);
    this.ViSAP.getCategoriesbyVideoid(ID, (category) => {
      const data = { title: title, desc: desc, category: category };
      this.onEdit.emit(data);
    });
  }

  /**
   * this method will emit the publish event
   * @param id :video id
   */
  onPublish(id) {
    this.Publish.emit(id);
  }

  /**
   * to get all checked checkbox list
   * @param id :video id
   * @param input :checkbox event
   */
  checkAll(id, input) {
    this.isSinglePublish = true;
    this.selCheckbxList.emit({ id, input });

  }

  /**
   * To unescape space in the title
   * @param title
   */
  unescapeVid(title) {
    return unescape(title);
  }

  setVideoID(id) {
    this.videoId = id;
    this.videoIntegration.emit({ id });
  }

  /**
   * Delete video from database
   * @param id :unique ID
   */
  onDlelete(id) {
    this.messageService
      .confirm('Are you sure you want to delete?')
      .subscribe(yes => {
        if (yes) {
          this.ViSAP.calldelete(id, '', () => {
            this.messageService.showAlert('Deleted Successfully');
            this.loadVideos();
          }, (err) => {
            if (err.status === 400) {
              this.messageService.showActionStatus(err.statusText, '');
            } else {
              this.messageService.showActionStatus('Something went wrong while saving!', 'Retry');
            }
          });
        }
      });
  }

  /**
   * Assign video
   * @param id :video Id
   * @param title :title of the video
   */
  assignVideo(id, title) {
    const stage = this.isStage;
    const dialogRef = this.dialog.open(AssignComponent, {
      width: '600px',
      height: '500px',
      data: { id: id, title: title, isStage: this.isStage, userid: this.userId }
    });
  }


  /**
   * Load all the categories when user update video
   */
  loadCategories() {
    this.getCategoryList();
  }

}
