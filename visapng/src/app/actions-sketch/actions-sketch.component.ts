import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ActionService } from '../common/action.service';
import { MessageService } from '../common/message.service';
import { ValidatorHelper } from '../common/validator-helper';

declare var $: any;

@Component({
  selector: 'vis-actions-sketch',
  templateUrl: './actions-sketch.component.html',
  styleUrls: ['./actions-sketch.component.css']
})
export class ActionsSketchComponent extends BaseComponent implements OnInit {

  editSketchCreatedTime: number;
  editSketchPausedTime: number;
  isEditSketch = false;
  submitted = false;
  duration: number;
  Form: FormGroup;
  validData = false;
  maxDuration: any;
  ismaxDurationReached = false;
  restDurationValue = '';
  @Input() pausedTime;

  constructor(logger: LoggerService, private messageService: MessageService, private action: ActionService, private fb: FormBuilder) {
    super(logger);
    this.Form = fb.group({
      'duration': new FormControl(null, Validators.compose([Validators.required, Validators.min(1), ValidatorHelper.isNumberCheck()]))
    });
  }

  ngOnInit() {
    this.initSketcherInstance();
    this.onSeekbarChanged();
    this.onDeleteAction();

  }

  /**
   * Initialisation of the sketcher
   */
  initSketcherInstance() {
    this.ViSAP.sketchcontainer = 'sketchcontainerDefault';
    this.ViSAP.sketchInitialise({ container: 'sketchcontainerDefault' });
  }

  /**
   * Save sketches
   */
  onSave(isFormValid) {
    this.submitted = true;
    if (isFormValid && this.validateData()  && !this.ismaxDurationReached) {
      const datatopass = this.getSketchData();
      if (!this.isEditSketch) {
        this.action.save(this.ViSAP.AddOverlay, datatopass);
      } else {
        this.action.update(this.ViSAP.updateActionsList, datatopass, 'sketch', this.editSketchCreatedTime, this.editSketchPausedTime);
      }
      this.ViSAP.initSketcher();
      this.ViSAP.handleSeekBar();
      this.action.changeSeekbarPosition(this.pausedTime, this.isEditSketch, this.duration);
      this.resetEditedValues();
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
         // As per user experience: clearing the sketch is not needed when seekbar changes
         // hence after changing the seekbar new action will be added
         this.isEditSketch = false;
      }
    );
  }

  /**
   *
   * @param value on change of the duration field
   */
  onDurationChange(value) {
    if (value !== undefined) {
        const duration = this.action.getLastActionDuration(this.pausedTime, this.editSketchCreatedTime , this.isEditSketch);
        this.action.changeSeekbar(value + duration);
        this.setMaxduration(duration);
    }
  }

  /**
   * Get the data to save the sketch
   */
  getSketchData() {
    let data;
    const imager = this.ViSAP.getImager();
    const i = imager.imgdata;
    const bgcolor = imager.color;
    const duration = this.duration;
    if (!this.isEditSketch) {
      data = { t: this.ViSAP.getCurrentTime(), i: i, color: bgcolor, d: duration };
    } else {
      data = { t: this.editSketchPausedTime, i: i, color: bgcolor, duration: duration };
    }
    return data;
  }

  /**
   * set the image on the video
   */
  edit(startTime: number, editSketchPausedTime: number, editedAction: any) {

    this.duration = editedAction.duration;
    this.isEditSketch = true;
    this.editSketchCreatedTime = startTime;
    this.editSketchPausedTime = editSketchPausedTime;
    this.setPausedTime(editSketchPausedTime);
    // since duration on change is invoked soon after duration model
    // change need to override  the play at event
    setTimeout(() => {
     this.action.changeSeekbar(startTime);
    }, 50);
  }

  /**
   *  After saving the sketch action fields needs to be cleared
   */
  resetEditedValues() {
    this.isEditSketch = false;
    this.editSketchCreatedTime = 0;
    this.duration = null;
    this.submitted = false;
    this.validData = false;
    this.ismaxDurationReached = false;
  }

   /**
   *  cancel the action an resume to play mode.
   */
  cancel() {
    this.Form.reset('');
    this.action.cancel();
  }

  /**
   * Validation:Empty data are not allowed.
   */
  validateData() {
    const isSketched = this.ViSAP.isSketchEmpty();
    if (!isSketched) {
     this.validData = true;
     this.messageService.showAlert('Sketch can\'t be empty');
     return false;
    } else {
      return true;
    }
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
