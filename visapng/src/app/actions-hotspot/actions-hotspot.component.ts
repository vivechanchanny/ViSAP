 
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ActionService } from '../common/action.service';
import { MessageService } from '../common/message.service';
import { ValidatorHelper } from '../common/validator-helper';


@Component({
  selector: 'vis-actions-hotspot',
  templateUrl: './actions-hotspot.component.html',
  styleUrls: ['./actions-hotspot.component.css']
})
export class ActionsHotspotComponent extends BaseComponent implements OnInit {
  Form: FormGroup;
  isEditHotspot = false;
  editHotspotCreatedTime;
  editHotspotPausedTime;
  hotspotTittle = '';
  hotspotContent = '';
  editDurationValue;
  duration;
  pauseOnshow = false;
  cssAttributeLeft;
  cssAttributeTop;
  cssAttWidth;
  cssAttheight;
  isPreviewed = false;
  submitted = false;
  maxDuration: any;
  ismaxDurationReached = false;
  restDurationValue = '';
  @Input() pausedTime;

  constructor(logger: LoggerService, private messageService: MessageService,
    private fb: FormBuilder, private action: ActionService) {
    super(logger);
    this.Form = fb.group({
      'hotspotTittle': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1),
                                             ValidatorHelper.maxLength(255)])),
      'description': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1)])),
      'duration': new FormControl(null, Validators.compose([Validators.required, Validators.min(1),
                                  ValidatorHelper.isNumberCheck()])),
      'pauseOnshow': new FormControl(null, Validators.compose([]))

    });

  }

  ngOnInit() {
   // this.resetEditedValues();
   // displays remaining video duration while adding actions on increment/decrement of duration.
   this.onSeekbarChanged();
   this.onDeleteAction();
  }

  onSave(isFormvalid) {
    this.submitted = true;
    if (isFormvalid) {
      const datatopass = this.getHotspotData();
      if (!this.isEditHotspot  && !this.ismaxDurationReached) {
        this.action.save(this.ViSAP.AddAndSaveHotspot, datatopass);
      } else {
        this.action.update(this.ViSAP.updateActionsList, datatopass, 'hotspot', this.editHotspotCreatedTime, this.editHotspotPausedTime);
      }
      this.ViSAP.handleSeekBar();
      this.ViSAP.HotspotEditTool(null);
      this.ViSAP.initHotspot();
      this.action.changeSeekbarPosition(this.pausedTime, this.isEditHotspot, this.duration);
      this.resetEditedValues();
    }
  }

    /**
   *  displays remaining video duration while adding actions on seekbar change.
   */
  onSeekbarChanged() {
    this.action.res$.subscribe(
      (pausedTime) => {
        this.pausedTime =  pausedTime;
        this.duration = 1;
        this.ismaxDurationReached = false;
      }
    );
  }

    /**
   *
   * @param value on change of the duration field
   */
  onDurationChange(value) {
    if (value !== undefined && value !==  '') {
        const duration = this.action.getLastActionDuration(this.pausedTime, this.editHotspotCreatedTime , this.isEditHotspot);
        this.action.changeSeekbar(value + duration);
        this.setMaxduration(duration);
    }
  }

  /**
   * Preview hotspot position on video
   */
  previewHotspot() {
    if (this.hotspotTittle !== '' || this.hotspotContent !== '') {
      const hotspotObj = this.getHotspotdetails();
      this.ViSAP.RenderCurrentHotspot(hotspotObj, true);
      this.ViSAP.previewHotspot(hotspotObj);
      this.ViSAP.setDraggable();
      this.isPreviewed = true;
    }else {
      this.messageService.showAlert('Please add title or description to preview');
    }
  }

  /**
 * Get the data to save the hotspot
 */
  getHotspotData() {
    let  left, top;
    let data;
    const PauseOnShow = this.pauseOnshow ? 1 : 0;
    const duration = this.duration;
    this.checkForPreviewed();
    const position = this.getDefaultPosition();
    left = this.cssAttributeLeft ? this.cssAttributeLeft : position.left;
    top = this.cssAttributeTop ? this.cssAttributeTop : position.top;
    if (!this.isEditHotspot) {
      data = { ti: this.hotspotTittle, de: this.hotspotContent, t: this.pausedTime,
      d: duration, showOnpause: PauseOnShow, hotspotAttributes: { left: left, top: top } };
    } else {
      data = { ti: this.hotspotTittle, de: this.hotspotContent, time: this.editHotspotPausedTime,
      duration: duration, showOnpause: PauseOnShow, hotspotAttributes: { left: left + 'px', top: top + 'px' } };
    }
    return data;
  }

    /**
   *  cancel the action an resume to play mode.
   */
  cancel() {
    this.Form.reset('');
    this.action.cancel();
  }

  /**
   * After create/update the action to reset the fields
   */
  resetEditedValues() {
    this.isPreviewed = false;
    this.isEditHotspot = false;
    this.pauseOnshow = false;
    this.hotspotTittle = '';
    this.duration = '';
    this.hotspotContent = '';
    this.cssAttributeTop = null;
    this.cssAttributeLeft = null;
    this.submitted = false;
    this.ismaxDurationReached = false;
  }

  /**
   * check for the annottion has been previewed or not
   */
  checkForPreviewed() {
    if (this.isPreviewed) {
      const modifiedPostion = this.ViSAP.getModifiedPosition('#hotspotCircle');
      this.cssAttWidth = modifiedPostion.width;
      this.cssAttheight = modifiedPostion.height;
      this.cssAttributeTop = modifiedPostion.top;
      this.cssAttributeLeft = modifiedPostion.left;
    }
  }



  /**
 *  when User click on hotspot action edit button from the accordian
 * @param startTime : start time of the action first action
 * @param currentTime : time when the action created
 * @param editedAction : attributes needed while editing the hotspot action
 */
  edit(startTime: number, currentTime: number, editedAction: any) {
    this.hotspotTittle = editedAction.title;
    this.duration = editedAction.duration;
    this.isEditHotspot = true;
    this.hotspotContent = editedAction.description;
    this.pauseOnshow = editedAction.showOnpause === 1 ? true : false;
    this.editHotspotCreatedTime = startTime;
    this.editHotspotPausedTime = currentTime;
    this.cssAttributeLeft = editedAction.hotspotAttributes.left;
    this.cssAttributeTop = editedAction.hotspotAttributes.top;
    this.setPausedTime(currentTime);
    // since duration on change is invoked soon after duration model
    // change need to override  the play at event
    setTimeout(() => {
     this.action.changeSeekbar(startTime);
    }, 50);
  }

/**
 * While preview to render the hotspot on the screen
 * and bind the drag and click events
 */
  getHotspotdetails () {
    const title = this.hotspotTittle;
    const description = this.hotspotContent;
    let hsobj;
    if (this.isEditHotspot) {
        hsobj = { title: title, description: description, hotspotAttributes: { left: this.cssAttributeLeft, top: this.cssAttributeTop } };
        this.ViSAP.RenderCurrentHotspot(hsobj, true);
        this.ViSAP.setDraggable();
        return hsobj;
    } else {
        // To setEditArgs get exact center of the hotspot circle
        const position = this.getDefaultPosition();
        hsobj = { title: title, description: description, hotspotAttributes: { left: position.left, top: position.top } };
        return hsobj;
    }
}

/**
 * Default place to where host spot has to be previewed
 * is at the center of the player
 */
getDefaultPosition() {
  const data = this.ViSAP.getVideoDimensions();
  const top = data.height / 2;
  const left = data.width / 2;
  return { top: top, left: left };
}

  /**
   *  capture paused time when user pauses the video
   */
  setPausedTime(time) {
    this.pausedTime = time;
  }

   /**
   * Set the maximum duration for the action
   * @param value : duration value from the duration field
   */
  setMaxduration(value) {
    this.maxDuration = this.action.getMaxDuration(value);
    if (this.maxDuration <= this.duration) {
      this.ismaxDurationReached = true;
      this.restDurationValue = this.maxDuration; // TODO:  hh:mm:ss format?
    } else {
      this.ismaxDurationReached = false;
    }
  }


  /**
   * Reset fields on deletion of the action
   */
  onDeleteAction() {
    this.action.onDelete$.subscribe(() => {
        this.resetEditedValues();
      }
    );
  }

}
