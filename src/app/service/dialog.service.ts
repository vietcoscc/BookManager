import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AppDialogComponent } from '../component/app-dialog/app-dialog.component';
import { DialogData } from '../model/DialogData';
import { DialogType } from '../model/enum/DialogType';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private activeDialog: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null)
  public activeDialogObs = this.activeDialog.asObservable()

  constructor(public dialog: MatDialog) { }

  openDialog(data: DialogData | null = null, afterClose: () => void = () => { }): void {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      width: '250px',
      data: data,
      closeOnNavigation: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(closed);
      afterClose()
    });
  }
}
