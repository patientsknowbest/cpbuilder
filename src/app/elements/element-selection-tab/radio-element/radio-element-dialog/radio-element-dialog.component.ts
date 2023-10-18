import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";

@Component({
  selector: 'app-radio-element-dialog',
  templateUrl: './radio-element-dialog.component.html',
  styleUrls: ['./radio-element-dialog.component.css']
})
@Injectable()
export class RadioElementDialogComponent {
  public label: string;
  public radioName: string;
  public radioElementValues: string[] = [];
  public bufferRadioElementValues: string[] = [];
  public radioElementIds: string[] = [];
  public bufferRadioElementIds: string[] = [];
  public radioElementAttributeValues: string[] = [];
  public bufferRadioElementAttributeValues: string[] = [];

  constructor(public dialogRef: MatDialogRef<RadioElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.radioName = data.radioName;
    this.radioElementValues = data.inputValues;
    this.bufferRadioElementValues = [...this.radioElementValues];
    this.radioElementIds = data.inputIds;
    this.bufferRadioElementIds = [...this.radioElementIds];
    this.radioElementAttributeValues = data.inputAttributeValues;
    this.bufferRadioElementAttributeValues = [...this.radioElementAttributeValues];
  }

  populateRadioElements(){
    for (let i = 0; i < this.bufferRadioElementValues.length; i++) {
      this.radioElementValues[i] = this.bufferRadioElementValues[i]
    }
    for (let i = 0; i < this.bufferRadioElementIds.length; i++) {
      this.radioElementIds[i] = this.bufferRadioElementIds[i]
    }
    for (let i = 0; i < this.bufferRadioElementAttributeValues.length; i++) {
      this.radioElementAttributeValues[i] = this.bufferRadioElementAttributeValues[i]
    }
  }

  addRadioButton(){
    this.radioElementValues.push('VALUE' + (this.radioElementValues.length + 1));
    this.radioElementIds.push('ID' + (this.radioElementIds.length + 1));
    this.radioElementAttributeValues.push('ATTR_VALUE' + (this.radioElementAttributeValues.length + 1));
  }

  removeRadioButton(indexOfTheElement: number){
    if (this.radioElementValues.length > 1) {
      this.radioElementValues.splice(indexOfTheElement,1);
      this.bufferRadioElementValues.splice(indexOfTheElement, 1);
    }
    if (this.radioElementIds.length > 1) {
      this.radioElementIds.splice(indexOfTheElement,1);
      this.bufferRadioElementIds.splice(indexOfTheElement, 1);
    }
    if (this.radioElementAttributeValues.length > 1) {
      this.radioElementAttributeValues.splice(indexOfTheElement,1);
      this.bufferRadioElementAttributeValues.splice(indexOfTheElement, 1);
    }
  }

}
