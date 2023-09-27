import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";

@Component({
  selector: 'app-checkbox-element-dialog',
  templateUrl: './checkbox-element-dialog.component.html',
  styleUrls: ['./checkbox-element-dialog.component.css']
})
@Injectable()
export class CheckboxElementDialogComponent {
  public label: string;
  public checkBoxValues: string[] = [];
  constructor(public dialogRef: MatDialogRef<CheckboxElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.label = data.label;
    this.checkBoxValues = data.checkBoxValues;
  }
}
