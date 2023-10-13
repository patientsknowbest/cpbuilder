import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";

@Component({
  selector: 'app-text-element-dialog',
  templateUrl: './text-element-dialog.component.html',
  styleUrls: ['./text-element-dialog.component.css']
})
@Injectable()
export class TextElementDialogComponent {

  public label: string;
  public id: string;

  constructor(public dialogRef: MatDialogRef<TextElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
      this.label = data.label;
      this.id = data.id;
  }
}
