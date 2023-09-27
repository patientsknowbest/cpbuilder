import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";
import {Service} from "../../../../service/service";

@Component({
  selector: 'app-radio-element-dialog',
  templateUrl: './radio-element-dialog.component.html',
  styleUrls: ['./radio-element-dialog.component.css']
})
@Injectable()
export class RadioElementDialogComponent {
  public label: string;
  public inputValues: string[] = [];

  constructor(public dialogRef: MatDialogRef<RadioElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataService: Service) {
    this.label = data.label;
    this.inputValues = data.inputValues;
  }
}
