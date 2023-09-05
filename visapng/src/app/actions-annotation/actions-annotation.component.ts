import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ActionService } from '../common/action.service';
import { MessageService } from '../common/message.service';
import { ValidatorHelper } from '../common/validator-helper';


@Component({
  selector: 'vis-actions-annotation',
  templateUrl: './actions-annotation.component.html',
  styleUrls: ['./actions-annotation.component.css']
})
export class ActionsAnnotationComponent extends BaseComponent implements OnInit {
  Form: FormGroup;
  isEditAnnotation = false;
  editAnnotationCreatedTime;
  editAnnotationPausedTime;
  annotationtitle: string;
  editDurationValue;
  duration: any;
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
  constructor(logger: LoggerService, private messageService: MessageService, private fb: FormBuilder, private action: ActionService) {
    super(logger);

    this.Form = fb.group({
      'annotationtitle': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1),
      ValidatorHelper.maxLength(255)])),
      'duration': new FormControl(null, Validators.compose([Validators.required, Validators.min(1), ValidatorHelper.isNumberCheck()])),
      'pauseOnshow': new FormControl(null, Validators.compose([])),
      'description': new FormControl(null, Validators.compose([ValidatorHelper.minLength(1)]))
    });

  }

  ngOnInit() {
    this.resetEditedValues();
    this.ViSAP.removeCKobjects();
    const annotationTextArea = document.getElementById('cmtDesc');
    this.ViSAP.editor.rePlaceCkeditor(annotationTextArea);
    this.onSeekbarChanged();
    this.onDeleteAction();
  }

  onSave(isValidForm) {
    this.submitted = true;
    const isValidDescription = this.validateDescrption();
    if (isValidForm && isValidDescription && !this.ismaxDurationReached) {
      const datatopass = this.getAnnotationData();
      if (!this.isEditAnnotation) {
        this.action.save(this.ViSAP.AddAndSaveAnnotate, datatopass);
      } else {
        this.action.update(this.ViSAP.updateActionsList, datatopass,
          'annotation', this.editAnnotationCreatedTime, this.editAnnotationPausedTime);
      }
      this.ViSAP.handleSeekBar();
      this.ViSAP.AnnotateEditTool(null);
      this.ViSAP.initAnnotator();
      this.action.changeSeekbarPosition(this.pausedTime, this.isEditAnnotation, this.duration);
      this.resetEditedValues();
    }

  }

  /**
   * Preview annotation position on video
   */
  previewAnnotation() {
    const time = this.ViSAP.getCurrentTime(),
      title = this.annotationtitle;
    const annotationTextArea = document.getElementById('cmtDesc');
    const decsription = this.ViSAP.editor.getValue(annotationTextArea);
    if (title !== '' || this.ViSAP.editor.isEditorEmpty(annotationTextArea)) {
      let ansObj;
      if (this.isEditAnnotation) {
        ansObj = {
          title: title, description: decsription, StartTime: time, duration: this.duration,
          AnnotationAttributes: {
            left: this.cssAttributeLeft, top:
              this.cssAttributeTop, width: this.cssAttWidth, height: this.cssAttheight
          }
        };
      } else {
        ansObj = {
          title: title, description: decsription, StartTime: time, duration: this.duration,
          AnnotationAttributes: {
            left: '0px', top: '0px', width: this.ViSAP.annotationAttr.width,
            height: this.ViSAP.annotationAttr.height
          }
        };
        // this is the default position of the annotation so left is 0px and top is 34px to place the annotation exactly below the title.
      }

      // Here annotation top and left will calcualted based on videomaincontainer height and width.
      // dividing videoMainContainer width by 100 will set the annotation default position
      // to almost top left corner. dividing videoMainContainer height by 6 will set the annotation
      // default position to almost top.
      this.ViSAP.RenderCurrentAnnotates(ansObj, true);
      this.isPreviewed = true;
    } else {
      this.messageService.showAlert('Please add title or description to preview');
    }
  }

  /**
 * Get the data to save the annotation
 */
  getAnnotationData() {
    let width, height, left, top;
    let data;
    const description = this.ViSAP.editor.getValue(document.getElementById('cmtDesc'));
    this.checkForPreviewed();
    width = this.cssAttWidth ? this.cssAttWidth : this.ViSAP.annotationAttr.width;
    height = this.cssAttheight ? this.cssAttheight : this.ViSAP.annotationAttr.height;
    left = this.cssAttributeLeft ? this.cssAttributeLeft : this.ViSAP.annotationAttr.left;
    top = this.cssAttributeTop ? this.cssAttributeTop : this.ViSAP.annotationAttr.top;
    if (!this.isEditAnnotation) {
      data = {
        ti: this.annotationtitle, de: description, t: this.ViSAP.getCurrentTime(), d: this.duration,
        PauseOnShow: this.pauseOnshow, AnnotationAttributes: { left: left, top: top, height: height + 'px', width: width + 'px' }
      };
    } else {

      data = {
        ti: this.annotationtitle, de: description, time: this.editAnnotationPausedTime,
        duration: this.duration, PauseOnShow: this.pauseOnshow,
        AnnotationAttributes: { left: left + 'px', top: top + 'px', height: height + 'px', width: width + 'px' }
      };
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

  resetEditedValues() {
    this.isPreviewed = false;
    this.isEditAnnotation = false;
    this.pauseOnshow = false;
    this.annotationtitle = '';
    this.duration = '';
    this.cssAttWidth = null;
    this.cssAttheight = null;
    this.cssAttributeLeft = null;
    this.cssAttributeTop = null;
    this.submitted = false;
    this.ismaxDurationReached = false;
  }

  /**
   * check for the annottion has been previewed or not
   */
  checkForPreviewed() {
    if (this.isPreviewed) {
      const modifiedPostion = this.ViSAP.getModifiedPosition('#annotates');
      this.cssAttWidth = modifiedPostion.width;
      this.cssAttheight = modifiedPostion.height;
      this.cssAttributeTop = modifiedPostion.top;
      this.cssAttributeLeft = modifiedPostion.left;
    }
  }



  /**
 *  when User click on annotation action edit button from the accordian
 * @param startTime : start time of the action first action
 * @param currentTime : time when the action created
 * @param editedAction : attributes needed while editing the annotation action
 */
  edit(actionStartTime: number, pausedTime: number, editedAction: any) {
    this.annotationtitle = editedAction.title;
    this.duration = editedAction.duration;
    this.isEditAnnotation = true;
    this.pauseOnshow = editedAction.PauseOnShow;
    this.editAnnotationCreatedTime = actionStartTime;
    this.editAnnotationPausedTime = pausedTime;
    this.cssAttributeLeft = editedAction.AnnotationAttributes.left;
    this.cssAttributeTop = editedAction.AnnotationAttributes.top;
    this.cssAttWidth = editedAction.AnnotationAttributes.width;
    this.cssAttheight = editedAction.AnnotationAttributes.height;
    this.ViSAP.EditAnnotate(editedAction);
    this.setPausedTime(pausedTime);
   // since duration on change is invoked soon after duration model
   // change need to override  the play at event
   setTimeout(() => {
    this.action.changeSeekbar(actionStartTime);
   }, 50);
  }

  /**
   *  capture paused time when user pauses the video
   */
  setPausedTime(time) {
    this.pausedTime = time;
  }

  /**
   *
   * @param value on change of the duration field
   */
  onDurationChange(value) {
    if (value !== '') {
        const duration = this.action.getLastActionDuration(this.pausedTime, this.editAnnotationCreatedTime , this.isEditAnnotation);
        this.action.changeSeekbar(value + duration);
        this.setMaxduration(duration);
      }
  }

  /**
   * ck editor filed can not be validated as part of the form
   * and hence separetly validated
   */
  validateDescrption() {
    const annotationTextArea = document.getElementById('cmtDesc');
    const validDescriprion = this.ViSAP.editor.isEditorEmpty(annotationTextArea);
    if (!validDescriprion) {
      this.messageService.showAlert('Description can\'t be empty');
    }
    return validDescriprion;
  }

  /**
   * On seek bar changed
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
   * Reset fields on deletion of the action
   */
  onDeleteAction() {
    this.action.onDelete$.subscribe(() => {
        this.resetEditedValues();
      }
    );
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

}
