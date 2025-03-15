import { Injectable } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _dialogRef?: MatDialogRef<unknown>

  constructor(private readonly dialog: MatDialog) { }

  openCreatUserDialog() {
    this.terminateOldDialog()
    this._dialogRef = this.dialog.open(UserFormComponent);
    this._dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog res ${result}`);
    });
  }

  private terminateOldDialog() {
    if (this._dialogRef === undefined) return
    this._dialogRef.close()
    this._dialogRef = undefined
  }
}
