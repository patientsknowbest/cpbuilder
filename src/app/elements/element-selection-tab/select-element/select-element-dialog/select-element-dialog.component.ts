import {
  Component,
  Inject,
  Injectable,
  OnInit,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../input-element/input-element-dialog/input-element-dialog.component";

@Component({
  selector: 'app-select-element-dialog',
  templateUrl: './select-element-dialog.component.html',
  styleUrls: ['./select-element-dialog.component.css']
})
@Injectable()
export class SelectElementDialogComponent {

  public label: string;
  public id: string;
  public selectOptionValues: string[] = [];
  public bufferOptionValues: string[] = [];
  public selectOptionAttributeValues: string[] = [];
  public bufferOptionAttributeValues: string[] = [];
  private currentIndex:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.id = data.id;
    this.selectOptionValues = data.selectOptionValues;
    this.bufferOptionValues = [...this.selectOptionValues]
    this.selectOptionAttributeValues = data.selectOptionAttributeValues;
    this.bufferOptionAttributeValues = [...this.selectOptionAttributeValues]
    this.currentIndex = 0;
  }

  populatingOptionValues(){
  for (let i = 0; i < this.bufferOptionValues.length; i++) {
    this.selectOptionValues[i] = this.bufferOptionValues[i]
  }
  for (let i = 0; i < this.bufferOptionAttributeValues.length; i++) {
    this.selectOptionAttributeValues[i] = this.bufferOptionAttributeValues[i]
  }
}

  addOption(){
    this.selectOptionValues.push('VALUE' + (this.selectOptionValues.length + 1));
    this.selectOptionAttributeValues.push('ATTR_VALUE' + (this.selectOptionAttributeValues.length + 1));
  }

  removeOption(indexOfTheElement: number){
    if (this.selectOptionValues.length > 1) {
      this.selectOptionValues.splice(indexOfTheElement,1);
      this.bufferOptionValues.splice(indexOfTheElement, 1);
    }
    if (this.selectOptionAttributeValues.length > 1) {
      this.selectOptionAttributeValues.splice(indexOfTheElement,1);
      this.bufferOptionAttributeValues.splice(indexOfTheElement, 1);
    }
  }
}
