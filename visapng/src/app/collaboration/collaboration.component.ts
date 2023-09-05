import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { ImportComponent } from '../import/import.component';
import { MessageService } from '../common/message.service';
import { VideoListComponent } from '../video-list/video-list.component';
import { VisapintegrationComponent } from '../visapintegration/visapintegration.component';
declare function unescape(s: string): string;
declare function escape(s: string): string;

@Component({
  selector: 'vis-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.css']
})
export class CollaborationComponent extends BaseComponent implements OnInit {
  dialogResult = '';
  isSelected = false;
  callbackObject;
  checkBxList: any[];
  mainButton: Ng2FloatBtn;
  buttons: Array<Ng2FloatBtn>;
  isChBxChecked = false;
  @ViewChild(VideoListComponent) videoList: VideoListComponent;
  constructor(logger: LoggerService, private messageService: MessageService, public dialog: MdDialog, private router?: Router) {
    super(logger);
    this.mainButton = {
      color: 'accent',
      iconName: 'more_vert'
    };
    // Floating button for collaboration page
    this.buttons = [
      {
        color: 'accent',
        iconName: 'add',
        onClick: () => {
          this.openDialog();
        },
        label: 'import',

      },
      {
        color: 'accent',
        iconName: 'done_all',
        onClick: (event) => {
          this.selectAll(this.isSelected);

        },
        label: 'Select All'
      },
      {
        color: 'accent',
        iconName: 'publish',
        onClick: () => {
          this.publish();

        },
        label: 'publish'
      }
    ];

  }

  /**
   *  On nginit 
   */
  ngOnInit() {
    this.checkBxList = this.videoList.listOfVidIds;
  }
  /**
   *  Invoke visap player instance and initialise th player component
   * @param videoid
   */
  onPlayEvent(videoid: string) {
    this.logger.info('Info: Edit a video:');
    this.router.navigate(['/edit', videoid]);
  }

  /**
   * this event triggers when the select all is clicked
   * @param isChecked
   */
  selectAll(isChecked) {
    if (!isChecked) {
      this.videoList.isChecked = true;
      this.isSelected = true;
      this.isChBxChecked = true;
    } else {
      this.videoList.isChecked = false;
      this.isSelected = false;
      this.isChBxChecked = false;
    }
  }

  /**
   * To get all selected checkbox list
   * @param data
   */
  getCheckBxList(data) {
    if (this.videoList.isChecked === true) {
      this.videoList.checkBoxArry = this.videoList.listOfVidIds;
    }
    if (data.input.checked === true) {
      this.videoList.checkBoxArry.push(data.id);
      this.isChBxChecked = true;
    } else {
      this.videoList.checkBoxArry.splice(this.videoList.checkBoxArry.indexOf(data.id), 1);
      this.isChBxChecked = false;
      this.videoList.isSinglePublish = false;
    }
  }

  /**
   * singleVideopublish
   * @param id
   */
  vidPublish(id) {
    if (id) {
      this.checkBxList = [];
      this.logger.info('publish:singleVideopublished:' + id);
      this.checkBxList.push(id);
      this.isChBxChecked = true;
    }
    this.publish();
  }

  /**
   * publish video starts
   */
  publish() {
    const source = this.videoList.sourcelist;
    if (!this.isChBxChecked) {
      this.messageService.showActionStatus('Please select atleast one video to publish', 'ok');
      return;
    }
    if (this.videoList.isSinglePublish) {
      this.checkBxList = this.videoList.checkBoxArry;
    }
    this.setCallbackObject('copied to myspace');
    this.ViSAP.doPublish(source, this.checkBxList, this.callbackObject);
  }


  /**
  * Need to set the call back functions : Visap need callback objects
  */
  setCallbackObject(action) {
    this.callbackObject = {
      onSaving: () => {
        this.messageService.showActionStatus(action + 'Successfully', 'Ok');
      },
      onSave: () => {
        this.messageService.showActionStatus(action + 'Successfully', 'Ok');
      },
      onError: () => {
        this.messageService.showMessages('Something went wrong while ' + action + '!', 'Retry', this.vidPublish);
      }

    };
  }
  /**
   * video import modal popup will open
   */
  openDialog() {
    const dialogRef = this.dialog.open(ImportComponent, {
      width: '530px',
      height: '575px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.videoList.loadVideos();
      this.dialogResult = result;

    });
  }
  /**
   * To edit video title,category and description
   * @param videoDetails :title,description,category
   */
  videoEditTittleDesc(videoDetails) {
    const dialogRef = this.dialog.open(ImportComponent, {
      width: '550px',
      height: '360px'
    });
    const categorystring = videoDetails.category.toString();
    dialogRef.componentInstance.isEditMode = true;
    dialogRef.componentInstance.Form.controls['title'].setValue(unescape(videoDetails.title));
    dialogRef.componentInstance.Form.controls['desc'].setValue(unescape(videoDetails.desc));
    const category = videoDetails.category.Categories.filter(function(entry) { return entry.trim() !== ''; });
    dialogRef.componentInstance.newCategoryList = category;

    dialogRef.afterClosed().subscribe(result => {
      this.videoList.loadCategories();
    });
  }

  /**
   * Video integration id modal popup
   * @param data :video id
   */
  setVid(data) {
    const dialogRef = this.dialog.open(VisapintegrationComponent, {
      width: '400px',
      height: '215px',
      data: 'this is dialog'
    });
    dialogRef.componentInstance.videoId = data.id;
  }
}
