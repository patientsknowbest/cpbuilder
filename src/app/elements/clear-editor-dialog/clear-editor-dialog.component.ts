import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { DialogData } from '../element-selection-tab/input-element/input-element-dialog/input-element-dialog.component';

@Component({
  selector: 'app-clear-editor-dialog',
  templateUrl: './clear-editor-dialog.component.html',
  styleUrls: ['./clear-editor-dialog.component.css']
})

export class ClearEditorDialogComponent {

  public delete: boolean;

  constructor(public dialogRef: MatDialogRef<ClearEditorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.delete = data.delete;
  }
}
