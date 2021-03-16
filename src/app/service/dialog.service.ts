import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
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

  openDialog(data: DialogData | null = null): Observable<any> {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      maxWidth: 500,
      minWidth: 250,
      data: data,
      closeOnNavigation: true,
      autoFocus: true
    });

    return dialogRef.afterClosed()
  }
}
