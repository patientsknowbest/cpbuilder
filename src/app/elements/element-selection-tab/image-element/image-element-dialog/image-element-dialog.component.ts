import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";

@Component({
  selector: 'app-image-element-dialog',
  templateUrl: './image-element-dialog.component.html',
  styleUrls: ['./image-element-dialog.component.css']
})
export class ImageElementDialogComponent {
  public label: string;
  public src: string;

  constructor(public dialogRef: MatDialogRef<ImageElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.src = data.src;
  }
}
