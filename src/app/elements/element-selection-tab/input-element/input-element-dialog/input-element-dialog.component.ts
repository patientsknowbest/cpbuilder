import {Component, EventEmitter, Inject, Injectable, Input, Output, Type} from '@angular/core';
import {InputElementComponent} from "../input-element.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
export interface DialogData {
  label: string;
  placeholder: string;
  helpText: string;
  selectOptionValues: string[]
  selectOptionAttributeValues: string[]
  inputValues: string[]
  inputIds: string[]
  inputAttributeValues: string[]
  checkBoxValues: string[]
  checkBoxIds: string[]
  checkBoxAttributeValues: string[]
  src: string;
  altText: string;
  height: string;
  color: string;
  radioName: string;
  delete: boolean;
  id: string;
}
@Component({
  selector: 'app-input-element-dialog',
  templateUrl: './input-element-dialog.component.html',
  styleUrls: ['./input-element-dialog.component.css']
})
@Injectable()
export class InputElementDialogComponent {
  public label: string;
  public placeholder: string;
  public helpText: string;
  public id: string;

  constructor(public dialogRef: MatDialogRef<InputElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.placeholder = data.placeholder;
    this.helpText = data.helpText;
    this.id = data.id;
  }

}
