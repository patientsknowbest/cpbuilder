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
  public radioElementValues: string[] = [];
  public bufferRadioElementValues: string[] = [];

  constructor(public dialogRef: MatDialogRef<RadioElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.radioElementValues = data.inputValues;
    this.bufferRadioElementValues = [...this.radioElementValues]
  }

  populateRadioElements(){
    for (let i = 0; i < this.bufferRadioElementValues.length; i++) {
      this.radioElementValues[i] = this.bufferRadioElementValues[i]
    }
  }

  addRadioButton(){
    this.radioElementValues.push('VALUE' + (this.radioElementValues.length + 1));
  }

  removeRadioButton(indexOfTheElement: number){
    console.log(indexOfTheElement)
    if (this.radioElementValues.length > 1) {
      this.radioElementValues.splice(indexOfTheElement,1);
      this.bufferRadioElementValues.splice(indexOfTheElement, 1);
    }
  }

}
