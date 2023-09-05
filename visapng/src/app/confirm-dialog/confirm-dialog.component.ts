import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'vis-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public title: string;
  public message: string;

  constructor( @Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ConfirmDialogComponent>) {

  }

  ngOnInit() {
  }

}
