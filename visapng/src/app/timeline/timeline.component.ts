import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../common/base.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoggerService } from '../logger/logger.service';
import { MessageService } from '../common/message.service';
import { ValidatorHelper } from '../common/validator-helper';
declare var $: any;

@Component({
  selector: 'vis-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() ViSAP;
  // to get child elements of snippet container.
  @ViewChild('snapshotContainer') tmLineContainer;
  tmLineForm: FormGroup;
  captureBtnTxt = 'Start Capture';
  startCaptTime: any;
  isVidPlaying = false;
  showPlayer = true;
  startTxt = 'start';

  playerSize = { small: '60', large: '100'};
  playerWidth = this.playerSize.small;

  constructor(logger: LoggerService, private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private msgService: MessageService) {

    super(logger);

    this.tmLineForm = fb.group({
      'title': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1),
                                ValidatorHelper.maxLength(255)])),
      'description': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1)]))
    });
  }

  ngOnInit() {
    this.bindingEvents();
  }

  ngAfterViewInit() {
    this.initTmLine();
  }

  /**
*  Invoke visap player instance and initialise the player component.
* @param vidId
*/
  onPlayEvent(vidId: string) {
    this.isVidPlaying = true;
    this.showPlayer = false;
    this.playerWidth = this.playerSize.large;
    this.ViSAP.play(vidId);
  }

  initTmLine() {
    const vidId = this.activatedRoute.snapshot.paramMap.get('id');
    if (vidId) {
      this.isVidPlaying = true;
      this.showPlayer = false;
      this.editTmLineVideo(vidId);
    } else {
      this.createTmLineVideo();
    }
  }

  // creating timeline video.
  createTmLineVideo() {
    this.ViSAP.newTimeline();
    this.ViSAP.isTimelIneMode = true;
    this.ViSAP.editTimelineMode = false;
  }

  // displaying captured snippets in snippet container and assigning title and description to form.
  editTmLineVideo(vidId) {
    try {
      this.ViSAP.editTimelineMode = true;
      this.ViSAP.editTmlineVideo(vidId);
      if (this.ViSAP.editTmSrcdetials) {
        const title = this.ViSAP.editTmSrcdetials.title;
        const description = this.ViSAP.editTmSrcdetials.desc;
        this.tmLineForm.setValue({ title: title, description: description });
        this.playerWidth = this.playerSize.large;
        // Checks the change detector and its children, and throws if any changes are detected.
        this.cdr.detectChanges();
      } else {
        this.msgService.showActionStatus('Ooops something went wrong !!!', 'Retry');
      }
    } catch (err) {
      this.msgService.showActionStatus('Ooops something went wrong !!!', 'Retry');
      this._logger.error('Error in editing time line video' + err);
    }
  }

  // bind event on page load.
  bindingEvents() {

    $('body').on('deleteSnippet', (e, size, callback) => {
      console.log('event');
      this.msgService
        .confirm('Are you sure you want to delete?')
        .subscribe(yes => {
          if (yes) {
          if (size <= 1) {
            this.msgService.showActionStatus('Timeline video should contain atleast one video snippet.', '');
          } else {
            callback();
            this.msgService.showAlert('Deleted Successfully');
          }
        }
        });
        e.stopImmediatePropagation();
    }
  );
  }

  /**
   * capturing video data with snippet.
   */
  captureVideoDetails() {
    try {
      this.ViSAP.timelineMode = true;
      if (this.ViSAP.currentSrcTypeName === 'timeline') {
        this.msgService.showActionStatus('This video added to time line.Please choose different video to capture.', '');
        return false;
      }
      if (this.ViSAP.paused() || this.ViSAP.paused() === undefined) {
        this.ViSAP.timelineMode = false;
        this.msgService.showActionStatus('Please play the video to capture.', '');
        return false;
      }
      if (this.captureBtnTxt === 'Start Capture') {
        this.startCaptTime = this.ViSAP.getCurrentTime();
        this.captureBtnTxt = 'End Capture';
        this.startTxt = 'stop';
      } else {
        const endCaptTime = this.ViSAP.getCurrentTime();
        if (this.startCaptTime > endCaptTime) {
          this.captureBtnTxt = 'End Capture';
          this.startTxt = 'start';
          this.msgService.showActionStatus('StartTime should be less than the endtime of the video', '');
          return false;
        } else {
          const capVidDuration = endCaptTime - this.startCaptTime;
          this.ViSAP.captureVidSnap.captureVideoDetails(this.startCaptTime, capVidDuration);
          this.captureBtnTxt = 'Start Capture';
          this.startTxt = 'start';
        }
      }
    } catch (err) {
      this.msgService.showActionStatus('Ooops something went wrong !!!', 'Retry');
      this._logger.error('Error in capturing time line video' + err);
    }
  }

  /**
   * creating time line video.
   */
  save() {
    try {
      const childEles = this.tmLineContainer.nativeElement.getElementsByTagName('div');
      if (childEles.length <= 0) {
        this.msgService.showActionStatus('Atleast one video should be captured to save timeline videos.', '');
        return false;
      }
      const value = this.ViSAP.editTimelineMode ? this.ViSAP.editTmSrcdetials._id : 0;
      if (this.ViSAP.source && !(this.ViSAP.util.tittleDuplicateCheck(value, this.tmLineForm.value.title.toLowerCase()))) {
        this.msgService.showActionStatus('Duplicate title, a video of same title already exists. Please use a different title.', '');
        return false;
      }
      this.ViSAP.tmLineSave(this.tmLineForm.value, '', () => {
        this.msgService.showActionStatus('Timeline video saved sucessfully.', '');
      }, (err) => {
        this.msgService.showActionStatus('Ooops something went wrong !!!', 'Retry');
        this._logger.error('Error in saving  time line video' + err);
      });
    } catch (err) {
      this.msgService.showActionStatus('Ooops something went wrong !!!', 'Retry');
      this._logger.error('Error in saving  time line video' + err);
    }
  }

  /**
  * clears all snippets and data.
  */
  reset() {
    this.ViSAP.newTimeline();
    this.ViSAP.isTimelIneMode = true;
    this.ViSAP.editTimelineMode = false;
    // clear title and desciprtion by resetting form.
    this.tmLineForm.reset();
    this.captureBtnTxt = 'Start Capture';
    this.startTxt = 'start';
  }

  /**
   *  navigate to myspace tab.
   */
  cancel() {
    this.router.navigate(['/myspace']);
  }

}
