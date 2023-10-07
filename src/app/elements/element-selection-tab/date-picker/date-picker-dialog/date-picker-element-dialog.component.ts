import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";

@Component({
  selector: 'app-date-picker-dialog',
  templateUrl: './date-picker-element-dialog.component.html',
  styleUrls: ['./date-picker-element-dialog.component.css']
})
export class DatePickerElementDialogComponent {
  public label: string;
  public helpText: string;

  constructor(public dialogRef: MatDialogRef<DatePickerElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.helpText = data.helpText;
  }

}
