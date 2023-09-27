import {Component, ComponentRef, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";
import {Service} from "../../../../service/service";
import {ElementsComponent} from "../../../elements.component";

@Component({
  selector: 'app-select-element-dialog',
  templateUrl: './select-element-dialog.component.html',
  styleUrls: ['./select-element-dialog.component.css']
})
@Injectable()
export class SelectElementDialogComponent implements OnInit{
  public label: string;
  public selectOptionValues: string[] = [];
  private currentIndex:number;

  constructor(public dialogRef: MatDialogRef<SelectElementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataService: Service) {
    this.label = data.label;
    this.selectOptionValues = data.selectOptionValues;
    this.currentIndex = 0;
  }

  ngOnInit() {
  }


  addOption(){
    this.selectOptionValues.push('VALUE' + (this.selectOptionValues.length + 1));
  }

  removeOption(){
    if (this.selectOptionValues.length > 1) {
      this.selectOptionValues.splice(-1);
    }
  }
}
