import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseService } from '../common/base.service';
import { LoggerService } from '../logger/logger.service';
import { MessageService } from '../common/message.service';
import { HttpClientService } from '../common/http-client.service';
declare var $: any;
/**
 *  Injectable service which save/update/delete actions
 */
@Injectable()
export class ActionService extends BaseService {
  authToken: string;
  callbackObject;
  // Observable string sources
  private actionList = new Subject<any>();
  // Observable string streams
  response$ = this.actionList.asObservable();

  // Observable string sources
  private vidDuration = new Subject<any>();
  // Observable string streams
  res$ = this.vidDuration.asObservable();

  // observable to reset the fields
  private onDelete = new Subject<any>();
  onDelete$ = this.onDelete.asObservable();


  constructor(logger: LoggerService, httpClient: HttpClientService, private messageService: MessageService) {
    super(logger, httpClient);
    this.bindingEvents();
  }

  bindingEvents() {
    $('body').on('seekbarchange', () => {
      const pausedTime = this.getRoundOff(this.ViSAP.getCurrentTime());
      this.ViSAP.setVideoPauseTime(pausedTime);
      this.vidDuration.next(pausedTime);
    });
  }

  /**
   * Save action to DB from different actions
   * @param actionMethod
   * @param datatopass
   */
  save(actionMethod: any, datatopass: any) {
    actionMethod(datatopass, '', () => {
      this.messageService.showAlert('Saved Successfully');
    }, () => {
      this.messageService.showActionStatus('Something went wrong while saving!', 'Retry');
    });
    this.getActionList();
  }

  /**
 * Save action to DB from different actions
 * @param actionMethod
 * @param datatopass
 */
  update(actionMethod: any, datatopass: any, type: string, startTime: number, pausedTime: number) {
    this.setCallbackObject('Saved');
    actionMethod(type, startTime, pausedTime, datatopass, this.callbackObject);
    this.getActionList();
  }


  /**
   * Deletion of the action with proper callback has been handled
   * @param actionMethod
   * @param datatopass
   */

  delete(actionMethod: any, datatopass: any) {
    this.messageService
      .confirm('Are you sure you want to delete?')
      .subscribe(yes => {
        if (yes) {
          this.setCallbackObject('Deleted');
          actionMethod(datatopass, this.callbackObject);
          this.onDelete.next();
        }
      });
    this.getActionList();
  }
  /**
   * Delete on single action : needs different overload
   * @param actionMethod
   * @param StartTime
   * @param CurrentTime
   * @param type
   */
  deleteSingleAction(actionMethod: any, StartTime, CurrentTime, type) {
    this.messageService
      .confirm('Are you sure you want to delete?')
      .subscribe(yes => {
        if (yes) {
          this.setCallbackObject('Deleted');
          actionMethod(StartTime, CurrentTime, type, this.callbackObject);
          this.onDelete.next();
        }
      });
    this.getActionList();
  }

  /**
 * Need to set the call back functions : Visap need callback objects
 */
  setCallbackObject(action) {
    this.callbackObject = {
      onSaving: () => {
        this.messageService.showAlert(action + ' Successfully');
      },
      onSave: () => {
        this.messageService.showAlert(action + ' Successfully');
      },
      onError: () => {
        this.messageService.showMessages('Something went wrong while ' + action + '!', 'Retry', this.save);
      }

    };
  }

  /**
 *  cancel the action an resume to play mode.
 */
  cancel() {
    this.ViSAP.playClick();
  }

  /**
* duation filed validation
*/
  validateTime(duration) {
    let isvalidDuration = true;
    // check for total duration of the video
    if (duration !== undefined && duration !== '') {
      this.ViSAP.onChangeDuration(duration, '', (error) => {
        isvalidDuration = false;
        return isvalidDuration;
      });
    }
    return isvalidDuration;
  }

  /**
   * Check for Tags/Links with the same name exist or not
   * @param isEdit
   * @param actualBookmark
   * @param modifiedBookmark
   * @param bookmarkMethod
   */
  checkBookmarkExist(isEdit, actualBookmark, modifiedBookmark, bookmarkMethod) {
    let isExist = false;
    bookmarkMethod(isEdit, actualBookmark, modifiedBookmark, (existmsg) => {
      this.messageService.showAlert(existmsg);
      isExist = true;
    });
    return isExist;
  }

  /**
   * Actionlist in ascending order
   */
  getActionList() {
    const actionsList = this.ViSAP.CurrentSrc().actions;
    if (actionsList !== undefined && actionsList.length > 0) {
      actionsList.sort(function (a, b) {
        return a.currentTime - b.currentTime;
      });
      this.actionList.next(actionsList);
      return actionsList;
    }
  }

  changeSeekbar(timerValue) {
    this.ViSAP.playAt(timerValue);
  }

  getMaxDuration(pausedTime) {
    return this.ViSAP.CurrentSrc().videototalduration - pausedTime;
  }

  getRoundOff(second) {
    return Math.floor(second);
  }

  getLastActionDuration(pausedTime, currentTime, isEdit) {
    const listactions = this.ViSAP.getPausedAction(pausedTime);
    if (listactions !== undefined && listactions.length !== 0) {
      const startTime = listactions[0].data.StartTime;
      // edit mode first action in a list need not calculate
      // for the given paused time
      if (isEdit) {
        if (pausedTime === currentTime) {
          return pausedTime;
        } else {
          // return action start time;
          return currentTime;
        }
      } else {
        const length = listactions.length;
        const lastStartTime = listactions[length - 1].data.StartTime;
        const listDuration = listactions[length - 1].data.duration;
        return (listDuration + lastStartTime);
      }
    } else {
      return pausedTime;
    }

  }

    /**
   * change the seek bar position after saving an
   * action from the paused time to duration given
   * New implementation
   */
  changeSeekbarPosition(pausedTime, isEdit, duration) {
    const currentTime = this.getRoundOff(this.ViSAP.getCurrentTime());
    let playAtValue = this.getLastActionDuration(pausedTime, currentTime, isEdit);
    playAtValue = isEdit ? (currentTime + duration) : playAtValue;
    // override the on change duration method in all the components
    setTimeout(() => {
      this.ViSAP.playAt(playAtValue);
    }, 50);
  }

}
