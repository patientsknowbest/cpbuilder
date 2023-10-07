import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";

@Component({
  selector: 'app-video-element-dialog',
  templateUrl: './video-element-dialog.component.html',
  styleUrls: ['./video-element-dialog.component.css']
})
export class VideoElementDialogComponent {
  public src: string;

  constructor(public dialogRef: MatDialogRef<VideoElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.src = data.src;
  }
}
