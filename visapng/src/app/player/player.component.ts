
import { Component, OnInit, Input, Output, trigger, state, animate, transition, style, ViewChild, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
declare var $: any;

import { RouteInfo } from '../common/route-info.service';
import { LoggerService } from '../logger/logger.service';
import { BaseComponent } from '../common/base.component';
import { ConfigService } from '../common/config.service';
import { HttpClientService } from '../common/http-client.service';
import { MessageService } from '../common/message.service';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { VideoListService } from '../video-list/video-list.service';
import { MdMenu } from '@angular/material/typings/menu/menu-directive';

@Component({
  selector: 'vis-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  animations: [
    trigger('isVisibleChanged', [
      state('true', style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('900ms'))
    ])]
})
export class PlayerComponent extends BaseComponent implements OnInit {
  args: any;
  @Output() onPauseVideo = new EventEmitter();
  @Output() onResumeVideo = new EventEmitter();
  isVisible = false;
  @ViewChild('menuTrigger') menu: any;
  @ViewChild('questionBlock') questionBlock: MdSidenav;
  @ViewChild(BookmarkComponent) bookmark: BookmarkComponent;
  previousUrl: any;
  currentUrl: any;
  @Input() editable = false;
  isMenuHidden = false;
  playerSize = { small: '60', medium: '80', large: '100' };
  @Input() playerWidth = this.playerSize.small;
  @BlockUI() blockUI: NgBlockUI;
  quizStarted = false;
  @Input() isPaused;
  fsMode = false;
  /**
   * Constructor
   * @param logger
   */
  constructor(logger: LoggerService, private httpClientService: HttpClientService, private messageService: MessageService,
    private router: Router, private routeInfo: RouteInfo,
    private activatedRoute: ActivatedRoute, private videoListService: VideoListService) {
    super(logger);
  }


  /**
* Close the player
*/
  onPlayerClosed() {
    const previousUrl = this.routeInfo.Details.prevUrl;
    this.router.navigate([previousUrl]);
  }

  ngOnInit() {
    this.initPlayer();
    this.ViSAP.showQuestion = this.showQuestion;
    $('body')
      .on('closePlayer', () => {
        this.onPlayerClosed();
      });

    $('body')
      .on('showQuestion', (event, parameter) => {
        this.showQuestion(parameter);
      });

    $('body')
      .on('pauseVideo', () => {
        this.pauseVideo();
      });

    $('body')
      .on('resumeVideo', () => {
        this.onResumeVideo.emit();
        this.isMenuHidden = this.ViSAP.isFullScreenON ? true : false;
      });

    $('body').on('onFullScreen', (event, callback) => {
      this.handleFullscreen(callback);
    });
  }


  /**
   * Player and its parameters are initialised
   */
  initPlayer() {
    const args = this.getPlayerArguments();
    this.unblock();
    if (args) {
      this.ViSAP.visapLocalize();
      this.ViSAP.init(args);
      this.playVideo();
    } else {
      this.messageService.showMessages('!!Oops something went wrong while playing video', 'Retry', this.initPlayer);
    }

  }

  /**
 * Play video from the selected thumbnail
 */
  playVideo() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.ViSAP.play(id);
    }
  }

  /**
   * Stop the video which is playing on the screen
   */
  stopVideo() {
    this.ViSAP.stop();
  }

  /**
   * Pause the video
   */
  pauseVideo() {
    this.onPauseVideo.emit();
    // hide the menu button only in edit mode(collboration/myspace)
    if (this.editable) {
      this.isMenuHidden = true;
      // when come back from fullscreen mode need to set player width to large
      // other wise still it was set to small
      this.playerWidth = this.playerSize.large;
    }
  }

  /**
   * Animate the player to move slide while showing question
   * @param event
   * @param type
   */
  slidePlayer() {
    this.isVisible = (this.isVisible === true ? false : true);
  }

  /**
   * Player to play the video needed set of arguments.
   */
  getPlayerArguments() {
    const authToken = sessionStorage.getItem('authT');
    const mode = this.routeInfo.isCollaboration();
    if (authToken) {
      const args = {
        isPlayerReinitialized: true,
        autoplay: false, 'path': this.ViSAP.config.videoRepo,
        snapRepopath: this.ViSAP.config.snapshotRepo,
        UserId: authToken,
        player: 'vid1', username: authToken,
        tokenURL: this.ViSAP.config.visapTokenurl, mode: mode, videoList: this.videoListService.videoList,
        questionType: this.ViSAP.config.questionType, fullscreenEle: $('#mainContainer')[0], postingVidTmInterval: '30'
      };
      return args;
    } else {
      return null;
    }

  }

  /**
   * open up tags and links list next to player
   */
  showBookMark() {
    this.bookmark.getBookmark();
    this.ViSAP.resizeActions();
  }

  showQuestion(close) {
    this.blockUI.start('');
    this.quizStarted = true;
    // reduce the main container size to 80% accomodate question container in fullscreen
    // normally question when appears it pushes extra space i.e size.large(100%)
    this.playerWidth = this.ViSAP.isFullScreenON ? this.playerSize.medium : this.playerSize.large;
    if (close) {
      this.unblock();
      this.quizStarted = false;
      // after exit question in fullscreen retain main container(player+question) size to original size
      this.playerWidth = this.ViSAP.isFullScreenON ? this.playerSize.large : this.playerSize.small;
    }
    if (!this.ViSAP.isFullScreenON) {
      this.menu.closeMenu();
    }
    this.questionBlock.toggle();
    this.ViSAP.resizeActions();
  }

  /**
   * Unblock the brockdrop
   */
  unblock() {
    this.blockUI.stop();
  }

  /**
   * when user click on fullscreen button or esc button to disable the fullscreen
   * @param callback : returns a fullscreen element
   */
  handleFullscreen(callback) {
    // works arround for Fire fox fullscreen mode:
    // main container width is more than the video width
    this.fsMode = !this.ViSAP.isFullScreenON;
    // hide/show tags/links menu button while toggle fullscreen mode or when video is paused
    this.isMenuHidden = !this.ViSAP.isFullScreenON ? true : false;
    this.playerWidth = this.ViSAP.isFullScreenON ? this.playerSize.small : this.playerSize.large;
    if (this.ViSAP.isFullScreenON && this.quizStarted) {
      this.playerWidth = this.playerSize.large;
    }
    // when user esc from fullscreen mode while in pause state
    // reset the action state also by emiting pause event
    if (this.ViSAP.isFullScreenON && this.isPaused) {
      this.pauseVideo();
    }
    const elem = '#mainContainer';
    callback(elem);
  }
}
