import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ActionService } from '../common/action.service';
import { ValidatorHelper } from '../common/validator-helper';
import { MessageService } from '../common/message.service';


@Component({
  selector: 'vis-actions-tags',
  templateUrl: './actions-tags.component.html',
  styleUrls: ['./actions-tags.component.css']
})
export class ActionsTagsComponent extends BaseComponent implements OnInit {
  submitted;
  Form: FormGroup;
  tagname = '';
  tagEditedTime = null;
  previousTag = '';
  callbackObject: any;
  isEdit = false;
  tags: any;
  @Output() deleteBookmark = new EventEmitter();
  @Output() editBookmark = new EventEmitter();

  constructor(logger: LoggerService, private fb: FormBuilder, private messageService: MessageService,
    private action: ActionService) {
    super(logger);
    this.Form = fb.group({
      'tagname': new FormControl(null, Validators.compose([Validators.required, ValidatorHelper.minLength(1),
      ValidatorHelper.maxLength(255)])),
      'tagtime': []
    });
  }

  /**
   * Page initialisation
   */
  ngOnInit() {
    this.showTags();
    // conditional validation:editing tag time.
    this.Form.get('tagtime').valueChanges.subscribe(
      (tagtime: string) => {
        if (this.isEdit) {
          this.Form.get('tagtime').setValidators([Validators.required, ValidatorHelper.validateTimeFormat()]);
        }
      }
    );
  }

  /**
   * Create/Update tags
   * @param tagdata
   */
  onSave(tagdata, isValid) {
    this.submitted = true;
    const tagPresent = this.checkTagExist();
    if (isValid && !tagPresent) {
      let tagTime;
      let datatopass;
      this.tagEditedTime ? tagTime = this.tagEditedTime : tagTime = this.ViSAP.getCurrentTime();
      if (!this.isEdit) {
        datatopass = { t: tagTime, d: tagdata.tagname };
        this.saveTags(datatopass);
      } else {
        // check for th video duration while in edit
        const timeValue = this.ViSAP.getTimeinSeconds(tagTime);
        const isValidTime = this.validateTime(timeValue);
        if (isValidTime) {
          datatopass = { t: timeValue, d: tagdata.tagname };
          this.saveTags(datatopass);
        }
      }
      this.ViSAP.handleSeekBar();
    }
  }

  /**
   * Once user click in edit to set the edited values on the text field
   * @param tagsData
   */
  onEdit(tagsData) {
    this.isEdit = true;
    this.previousTag = this.tagname = tagsData.d;
    this.tagEditedTime = this.ViSAP.getTimeFormat(tagsData.t);
    this.ViSAP.playAt(tagsData.t);
  }

  /**
   *  Deletion of the tag
   * @param tagsData : data needed to compare and delete the tags
   */
  onDlelete(tagsData) {
    this.messageService
      .confirm('Are you sure you want to delete?')
      .subscribe(yes => {
        if (yes) {
          this.setCallbackObject();
          this.ViSAP.RemoveCurrentTag(tagsData.d, this.callbackObject);
        }
      });
    this.action.getActionList();
    this.resetTagValues();
  }

  setCallbackObject() {
    this.callbackObject = {
      onSave: () => {
        this.messageService.showAlert('Deleted successfully');
      },
      onError: () => {
        this.messageService.showAlert('This tag is mapped to question and cannot be deleted or edited.');
      }
    };
  }

  /**
   *  cancel the action an resume to play mode.
   */
  cancel() {
    this.Form.reset('');
    this.action.cancel();
  }

  /**
   * reset tags input parameters and edited values
   */
  resetTagValues() {
    this.tagname = '';
    this.previousTag = '';
    this.tagEditedTime = null;
    this.isEdit = false;
    this.Form.reset('');
    this.submitted = false;
  }

  /**
 * tag time validation 
 */
  validateTime(tagTime) {
    // check for total duration of the video
    if (parseInt(tagTime) >= this.ViSAP.getDuration()) {
      this.messageService.showAlert('Time should be less than the duration of the video.');
      return false;
    } else {
      return true;
    }
  }

  saveTags(datatopass) {
    if (this.isEdit) {
      const res = this.ViSAP.removePreviousTag(this.previousTag);
      if (!res) {
        this.messageService.showAlert('This tag is mapped to question and cannot be deleted or edited');
        return;
      }
    }
    this.action.save(this.ViSAP.AddAndSaveTag, datatopass);
    this.resetTagValues();
    this.showTags();
  }

  /**
   * check tag is alredy present or not
   */
  checkTagExist() {
    const isExist = this.action.checkBookmarkExist(this.isEdit, this.previousTag, this.tagname, this.ViSAP.checkForTagExist);
    return isExist;
  }

  /**
   * List of tags to edit/delete
   */
  showTags() {
    this.tags = this.ViSAP.CurrentTags();
  }

  /**
   *
   * @param seconds Get the time format in hh:mm:ss format
   */
  getTimeFormat(seconds) {
    return this.ViSAP.getTimeFormat(seconds);
  }

}
