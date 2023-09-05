import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ActionService } from '../common/action.service';
import { MessageService } from '../common/message.service';

declare var $: any;
@Component({
  selector: 'vis-actions-question',
  templateUrl: './actions-question.component.html',
  styleUrls: ['./actions-question.component.css']
})
export class ActionsQuestionComponent extends BaseComponent implements OnInit {
  editQuestion: boolean;
  tags: any;
  selectedValue: string;

  constructor(logger: LoggerService, private action: ActionService, private messageService: MessageService, ) {
    super(logger);
  }


  ngOnInit() {
    this.ViSAP.aelib.initQuizEditor();
    this.getTags();
    $('body')
      .on('onQuestionCreated', () => {
        this.onSave();
      });

      $('body').on('selectedQuesTag', (e, tagVal) => {
        this.selectedValue = tagVal;
      });
  }

  /**
 *  Save/Update Question
 */
  onSave() {
    this.selectedValue = '';
    this.messageService.showActionStatus('Question Saved successfully', 'Ok');
  }

  /**
   * Tags for Questions
   */
  getTags() {
    this.tags = this.ViSAP.CurrentTags();
  }

  onTagChange() {
    (<any>window).selectedQuesTag = this.selectedValue;
  }


}

