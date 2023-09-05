import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'vis-visapintegration',
  templateUrl: './visapintegration.component.html',
  styleUrls: ['./visapintegration.component.css']
})
export class VisapintegrationComponent implements OnInit {
  videoId:string;

  constructor(public dialogRef: MdDialogRef<VisapintegrationComponent>) { }

  ngOnInit() {

  }
  /**
   * when cancel button is clicked
   */
  cancel() {
    this.dialogRef.close();
  }
}
