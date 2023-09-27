import {Component, EventEmitter, Inject, Injectable, Input, Output, Type} from '@angular/core';
import {InputElementComponent} from "../input-element.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
export interface DialogData {
  label: string;
  placeholder: string;
  helpText: string;
  selectOptionValues: string[]
  inputValues: string[]
  checkBoxValues: string[]
}
@Component({
  selector: 'app-input-element-dialog',
  templateUrl: './input-element-dialog.component.html',
  styleUrls: ['./input-element-dialog.component.css']
})
@Injectable()
export class InputElementDialogComponent {
  save = new EventEmitter<any>();
  public label: string;
  public placeholder: string;
  public helpText: string;

  constructor(public dialogRef: MatDialogRef<InputElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.placeholder = data.placeholder;
    this.helpText = data.helpText;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}