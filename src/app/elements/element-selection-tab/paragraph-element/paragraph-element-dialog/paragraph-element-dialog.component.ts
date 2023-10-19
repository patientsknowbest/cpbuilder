import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";

@Component({
  selector: 'app-paragraph-element-dialog',
  templateUrl: './paragraph-element-dialog.component.html',
  styleUrls: ['./paragraph-element-dialog.component.css']
})

@Injectable()
export class ParagraphElementDialogComponent {
  public paragraph: string;

  constructor(public dialogRef: MatDialogRef<ParagraphElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.paragraph = data.paragraph;
  }
}
