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
  public bufferCheckBoxValues: string[] = [];
  constructor(public dialogRef: MatDialogRef<CheckboxElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.label = data.label;
    this.checkBoxValues = data.checkBoxValues;
    this.bufferCheckBoxValues = [...this.checkBoxValues]
  }

  populatingCheckBoxValues(){
    for (let i = 0; i < this.bufferCheckBoxValues.length; i++) {
      this.checkBoxValues[i] = this.bufferCheckBoxValues[i]
    }
  }

  addCheckbox(){
    this.checkBoxValues.push('VALUE' + (this.checkBoxValues.length + 1));
  }

  removeCheckbox(indexOfTheElement: number){
    if (this.checkBoxValues.length > 1) {
      this.checkBoxValues.splice(indexOfTheElement,1);
      this.bufferCheckBoxValues.splice(indexOfTheElement, 1);
    }
  }
}
