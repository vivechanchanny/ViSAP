import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'

import { BaseComponent } from '../common/base.component';
import { LoggerService } from '../logger/logger.service';
import { VisapintegrationComponent } from '../visapintegration/visapintegration.component';

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.css']
})

export class MySpaceComponent extends BaseComponent implements OnInit {

  constructor(logger: LoggerService,public dialog: MdDialog, private router?: Router) {
    super(logger);
  }

    /**
   *  On nginit
   */
  ngOnInit() {
     
  }

    /**
   *  Invoke visap player instance and initialise th player component
   * @param videoid
   */
  onPlayEvent(videoid: string) {
     this.logger.info('Info: Edit a video:');
     this.router.navigate(['/edit', videoid]);
  }

   // Creating timeline video: Navigating to time line component.
  timeLine() {
    this.router.navigate(['/timeline']);
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
