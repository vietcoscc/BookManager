import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from 'src/app/model/DialogData';
import { DialogType } from 'src/app/model/enum/DialogType';


@Component({
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.css']
})
export class AppDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AppDialogComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data);

  }

  get isAlertDialog() {
    return this.data.type == DialogType.Alert
  }

  ngOnInit(): void {
    if (this.data.type == DialogType.Alert) {

    } else {

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
