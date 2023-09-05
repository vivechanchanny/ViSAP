import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
 
import { ActionService } from '../common/action.service';
import { PlayerComponent } from '../player/player.component';
import { ActionsTagsComponent } from '../actions-tags/actions-tags.component';
import { ActionsLinksComponent } from '../actions-links/actions-links.component';
import { ActionsSketchComponent } from '../actions-sketch/actions-sketch.component';
import { ActionsWhiteboardComponent } from '../actions-whiteboard/actions-whiteboard.component';
import { ActionsAnnotationComponent } from '../actions-annotation/actions-annotation.component';
import { ActionsHotspotComponent } from '../actions-hotspot/actions-hotspot.component';
import { MessageService } from '../common/message.service';

export interface IActions {
  name: string;
  isVisible: boolean;
}


@Component({
  selector: 'vis-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent extends BaseComponent implements OnInit {
  currentIndex = 0;
  editorIndex: number = -1;
  isPaused: boolean;
  @ViewChild(PlayerComponent) player: PlayerComponent;
  @ViewChild(ActionsTagsComponent) tags: ActionsTagsComponent;
  @ViewChild(ActionsLinksComponent) links: ActionsLinksComponent;
  @ViewChild(ActionsSketchComponent) sketcher: ActionsSketchComponent;
  @ViewChild(ActionsWhiteboardComponent) whiteboard: ActionsWhiteboardComponent;
  @ViewChild(ActionsAnnotationComponent) annotation: ActionsAnnotationComponent;
  @ViewChild(ActionsHotspotComponent) hotspot: ActionsHotspotComponent;
  editActionListTime = false;
  actionsList: any;
  playerSize = { small: '60', large: '100'};
  playerWidth = this.playerSize.small;
  pausedTime;
  isEditMode = true;
  actionTab = [
    {
      name: 'Tags',
      isVisible: false
    },
    {
      name: 'Links',
      isVisible: false
    },
    {
      name: 'Sketch',
      isVisible: false
    },
    {
      name: 'Annotation',
      isVisible: false
    },
    {
      name: 'Questions',
      isVisible: false
    },
    {
      name: 'Whiteboard',
      isVisible: false
    },

    {
      name: 'Hotspost',
      isVisible: false
    }
  ];
  tabIndexSequence = {tags: 0, links: 1, sketch: 2, annotation: 3, question: 4, whiteboard: 5, hotspot: 6 };
  currentAction: IActions = this.actionTab[this.currentIndex];
  constructor(logger: LoggerService, private router: Router,
    private messageService: MessageService, private action: ActionService) {
    super(logger);

  }

  /**
 *  On nginit
 */
  ngOnInit() {
    this.ViSAP.resumeAction(this.currentIndex);
    this.bindActionlistonSave();
    this.onSeekbarChanged();
  }

  /**
   *  Pause event triggerd from player while editing the video
   */
  onPauseEvent() {
    this.playerWidth = this.playerSize.large;
    const args = this.player.getPlayerArguments();
    const playerArguments = { args : args };
    this.ViSAP.initEditing(playerArguments);
    this.currentAction = this.actionTab[this.currentIndex];
    this.showActionList();
    this.isPaused = true;
    this.ViSAP.suspendAction(this.currentIndex);
    this.pausedTime = this.action.getRoundOff(this.ViSAP.getCurrentTime());
    this.ViSAP.setVideoPauseTime(this.pausedTime);
  }

  /**
   * Resume the video once editing is over
   */
  onResumeEvent() {
    // on resume : player width cannot be small all the time:
    // when user is normal mode player width should be small
    // when user in fullscreen mode player width should be large
    this.playerWidth = this.ViSAP.isFullScreenON ?  this.playerSize.large : this.playerSize.small ;
    this.isPaused = false;
    this.ViSAP.resumeAction(this.currentIndex);
  }

  /**
   * Show respective editor actions tools container on right side of the player
   * @param event: on change of the tabs to load the respective tools
   */
  showActionContainer(event: any) {
    this.currentIndex = event.index;
    this.currentAction = this.actionTab[event.index];
    this.ViSAP.suspendAction(this.currentIndex);
  }



  /**
   * On tab changes  to show the respective action tools container
   */
  showActionList() {
    this.actionsList = this.action.getActionList();
  }

  getTimeinFormat(time) {
    return this.ViSAP.getTimeFormat(time);
  }

  /**
   *  On edit button is clicked from the accordian :
   *  Enable respective action tabs and load its contents.
   * @param actionType : name of the action
   * @param StartTime : start time of the action first action
   * @param CurrentTime : Action created time
   */
  editActions(actionType, startTime, currentTime) {
    this.ViSAP.setPauseTm();
    // set video paused time to add action to same actionlist
    this.ViSAP.setVideoPauseTime(currentTime);
    this.pausedTime = currentTime;
    const Listactions = this.ViSAP.getPausedAction(currentTime);
    const action = this.ViSAP.getEditedListAction(actionType, Listactions, startTime);
    const editedAction = action.data;
    switch (actionType) {
      case 'sketch':
        this.currentIndex = this.tabIndexSequence.sketch;
        setTimeout(() => {
          this.ViSAP.enableSketchTabs(startTime, currentTime, editedAction);
          this.sketcher.edit(startTime, currentTime, editedAction);
        }, 550);
        break;
      case 'annotation':
        this.currentIndex = this.tabIndexSequence.annotation;
        setTimeout(() => {
          this.annotation.edit(startTime, currentTime, editedAction);
        }, 250);
        break;
      case 'questions':
        this.currentIndex = this.tabIndexSequence.question;
        setTimeout(() => {
          const editvalues = this.ViSAP.getQuestionActionList(actionType, Listactions, startTime);
          this.ViSAP.aelib.editQuestion(editvalues.data.questionId, currentTime);
        }, 250);
        break;
      case 'whiteboard':
        this.currentIndex = this.tabIndexSequence.whiteboard;
        setTimeout(() => {
          this.whiteboard.edit(startTime, currentTime, editedAction);
        }, 250);
        break;
      case 'hotspot':
        this.currentIndex = this.tabIndexSequence.hotspot;
        setTimeout(() => {
          this.hotspot.edit(startTime, currentTime, editedAction);
        }, 250);
        break;

    }

  }

  /**
   * Delete one single action
   * @param type : type of the action
   * @param StartTime : start time of the action first action
   * @param CurrentTime : Action created time
   */
  deleteAction(type, StartTime, CurrentTime) {
    this.action.deleteSingleAction(this.ViSAP.deleteAction, StartTime, CurrentTime, type);
  }

  /**
   * Delete complete action list from the accordian
   * @param currentTime : time which action is created
   */
  deleteActionList(currentTime: number, event: Event) {
    this.action.delete(this.ViSAP.RemoveActionList, currentTime);
    event.stopPropagation();
  }

  /**
   * enable text filed for editing the action time
   * @param index : in a list of action time to enable the perticular textbox
   * @param time : move to perticular time of the video
   */
  editActionTime(index: number, time: number, event: Event) {
    this.editActionListTime = true;
    this.editorIndex = index;
    this.ViSAP.playAt(time);
    event.stopPropagation();
  }

  /**
   * save time of the action in accordian
   * @param pauseTime
   * @param indx
   */
  saveActionTime(pauseTime: number, indx: number, event: Event) {
    this.ViSAP.SaveActionTimeHeader(pauseTime, indx, (msg) => {
      this.messageService.showAlert(msg);
    });
    this.editActionListTime = false;
    this.editorIndex = null;
    this.showActionList();
    event.stopPropagation();
  }

  /**
   * When user edit the start time of the action in accordian
   *  validate the time format
   * @param event : element event and its data needed
   */
  onActionTimeChange(event) {
    const regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
    const specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Semicolon'];
    // Allow Backspace, tab, end, and home keys and semicolon
    if (specialKeys.indexOf(event.code) !== -1) {
      return;
    }

    // Do not use event.keycode this is deprecated.
    const current: string = event.key;
    // We need this because the current value on the DOM element
    // is not yet updated with the value from this event
    const next: string = current.concat(event.key);
    if (next && !String(next).match(regex)) {
      event.preventDefault();
    }


  }

  /**
   * On save to update the actionlist
   */
  bindActionlistonSave() {
    this.action.response$.subscribe(
      (actionlist) => {
        this.actionsList = actionlist;
      }
    );
  }

  /**
   * Disable the expanel panel when clicked other
   * other than the expansion panel
   * @param event : click event and its args
   */

  disbleExpansion(event: Event) {
    event.stopPropagation();
  }

   /**
   * On seek bar changed
   */
  onSeekbarChanged() {
    this.action.res$.subscribe(
      (pausedTime) => {
        this.pausedTime = pausedTime;
      }
    );
  }


}
