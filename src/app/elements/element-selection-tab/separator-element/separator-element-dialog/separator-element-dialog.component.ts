import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";


@Component({
  selector: 'app-separator-element-dialog',
  templateUrl: './separator-element-dialog.component.html',
  styleUrls: ['./separator-element-dialog.component.css']
})
@Injectable()
export class SeparatorElementDialogComponent {

  public height: string;
  public color: string; 

  constructor(public dialogRef: MatDialogRef<SeparatorElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
      this.height = data.height;
      this.color = data.color;
  }
}
