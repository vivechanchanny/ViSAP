import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ActionService } from '../common/action.service';
import { MessageService } from '../common/message.service';
import { ValidatorHelper } from '../common/validator-helper';

declare var $: any;

@Component({
  selector: 'vis-actions-whiteboard',
  templateUrl: './actions-whiteboard.component.html',
  styleUrls: ['./actions-whiteboard.component.css']
})
export class ActionsWhiteboardComponent extends BaseComponent implements OnInit {
  chosen: string;
  editWhiteboard = false;
  editDurationValue: number;
  editWhiteboardCreatedTime: number;
  editWhiteboardPausedTime: number;
  directionValue = 'left';
  Form: FormGroup;
  pauseOnshow = false;
  submitted = false;
  duration;
  validData = false;
  sketchData = '';
  actionSwitched = false;
  remainingDuration: any;
  maxDuration: any;
  ismaxDurationReached = false;
  restDurationValue = '';
  @Input() pausedTime;

  constructor(logger: LoggerService, private messageService: MessageService, private fb: FormBuilder, private action: ActionService) {
    super(logger);

    this.Form = fb.group({
      'duration': new FormControl(null, Validators.compose([Validators.required, Validators.min(1), ValidatorHelper.isNumberCheck()])),
      'pauseOnshow': new FormControl(null, Validators.compose([])),
      'mode': new FormControl('wbtext'),
      'direction': new FormControl('left')
    });

  }

  ngOnInit() {
    this.ViSAP.removeCKobjects();
    this.showContainer();
    this.resetFieldValues();
    this.bindingEvents();
  }

  /**
   *  Save/Update Whiteboard
   */
  onSave(isFormValid) {
    this.submitted = true;
    const isDataValid = this.validateData();
    if (isFormValid && isDataValid && !this.ismaxDurationReached) {
      const datatoPass = this.getData();
      if (!this.editWhiteboard) {
        this.action.save(this.ViSAP.AddAndSaveWhiteboard, datatoPass);
      } else {
        this.action.update(this.ViSAP.updateActionsList, datatoPass, 'whiteboard',
          this.editWhiteboardCreatedTime, this.editWhiteboardPausedTime);
      }
      this.ViSAP.initWhiteboard();
      this.showContainer();
      this.ViSAP.handleSeekBar();
      this.action.changeSeekbarPosition(this.pausedTime, this.editWhiteboard, this.duration);
      this.resetFieldValues();
      this.resetRadioBtns();
    }
  }

  /**
  *  displays remaining video duration while adding actions on seekbar change.
  */
  onSeekbarChanged() {
    this.action.res$.subscribe(
      (pausedTime) => {
        this.pausedTime = pausedTime;
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
    if (value !== undefined) {
      const duration = this.action.getLastActionDuration(this.pausedTime, this.editWhiteboardCreatedTime, this.editWhiteboard);
      this.action.changeSeekbar(value + duration);
      this.setMaxduration(duration);
    }
  }

  /**
   * Common method which gives while creation and update time of the WB
   */
  getData() {
    const description = this.ViSAP.editor.getValue(document.getElementById('cmtWiteboard'));
    const duration = this.duration;
    const sketchData = this.getSketchedData();
    const pauseOnshow = this.pauseOnshow;
    const wbContainerWidth = $('#wboardContainer').css('width');
    return {
      description: description, CurrentVideoTime: this.pausedTime, duration: duration, sketchData: sketchData,
      PauseOnShow: pauseOnshow, whiteboardPosition: this.directionValue, whiteboardAttributes: { width: wbContainerWidth }
    };

  }

  /**
   * Left and right direction on chnage of the WB
   * @param id
   */
  onDirectionChange(id) {
    this.ViSAP.DisplayingWhiteboard(id);
  }

  /**
   * When user pauses and choosed WB,then container is hidden and hence
   * need to set the visibility
   */
  showContainer() {
    document.getElementById('whiteBoardWrapper').style.display = 'block';
  }

  /**
   *  when User click on WB action edit button from the accordian
   * @param startTime : start time of the action first action
   * @param currentTime : time when the action created
   * @param editedAction : attributes needed while editing the WB action
   */
  edit(startTime: number, currentTime: number, editedAction: any) {
    this.Form.controls.direction.setValue(editedAction.whiteboardPosition);
    this.Form.controls.mode.setValue('wbtext');
    this.duration = editedAction.duration;
    this.pauseOnshow = editedAction.PauseOnShow;
    this.directionValue = editedAction.whiteboardPosition;
    this.editWhiteboard = true;
    this.editWhiteboardCreatedTime = startTime;
    this.editWhiteboardPausedTime = currentTime;
    this.sketchData = editedAction.sketchData;
    this.validData = false;
    this.setPausedTime(currentTime);
    // since duration on change is invoked soon after duration model
    // change need to override  the play at event
    setTimeout(() => {
      this.ViSAP.EditWhiteboard(currentTime, editedAction);
      this.action.changeSeekbar(startTime);
    }, 50);
  }

  /**
 *  cancel the action an resume to play mode.
 */
  cancel() {
    this.Form.reset('');
    this.action.cancel();
  }

  /**
   * binding events on page load.
   */
  bindingEvents() {
    // on  delet action to reset the white board
    $('body').on('resetWhiteBoard', () => {
      this.resetRadioBtns();
      this.resetFieldValues();
    });
    this.onSeekbarChanged();
    this.onDeleteAction();
  }

  /**
   *  radio buttons will reset to default.
   */
  resetRadioBtns() {
    this.Form.controls.mode.setValue('wbtext');
    this.Form.controls.direction.setValue('left');
  }

  /**
   * clear the form field values after save/update
   */
  resetFieldValues() {
     // whiteboard container height will not be updated
    // properly while toggling from play/pause
    setTimeout(() => {
    this.editWhiteboard = false;
    this.pauseOnshow = false;
    this.duration = '';
    this.validData = false;
    this.submitted = false;
    this.ViSAP.WhiteboardEditTool(null);
    this.sketchData = '';
    this.actionSwitched = false;
    this.ismaxDurationReached = false;
      this.ViSAP.showTextWB();
      this.ViSAP.hideSketches();
    }, 250);
  }

  /**
   * Validation:Empty data are not allowed.
   */
  validateData() {
    const whiteboradDescription = document.getElementById('cmtWiteboard');
    const hasContent = this.ViSAP.editor.isEditorEmpty(whiteboradDescription);
    const isSketched = this.ViSAP.isSketchEmpty();
    if (!isSketched  && !hasContent) {
      this.messageService.showAlert('Whiteboard Text/Sketch can\'t be empty');
      return false;
    } else {
      return true;
    }
  }

  /**
   *
   * @param event Toggle between sketch and text tool
   */
  toggleAction(event) {
    this.ViSAP.toggleWhiteboardSketch(event.currentTarget.id);
    this.actionSwitched = true;
  }

  /**
   * Get the base 64 string of the sketch drawn
   */
  getSketchedData() {
    let imager;
    let sketchData = '';
    // Edit mode if user has not draw anything then retain same value
    sketchData = this.editWhiteboard ? this.sketchData : sketchData;
    // Get the image if the user has switched from text to sketch
    // and override the changes to previous sketch
    if (this.actionSwitched) {
        imager = this.ViSAP.getImager();
        sketchData = imager.imgdata;
    }
    return sketchData;
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
      this.resetFieldValues();
    }
    );
  }
}
