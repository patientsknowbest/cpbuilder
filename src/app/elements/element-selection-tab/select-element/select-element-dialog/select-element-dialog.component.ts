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
  private currentIndex:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.id = data.id;
    this.selectOptionValues = data.selectOptionValues;
    this.bufferOptionValues = [...this.selectOptionValues]
    this.currentIndex = 0;
  }

  populatingOptionValues(){
  for (let i = 0; i < this.bufferOptionValues.length; i++) {
    this.selectOptionValues[i] = this.bufferOptionValues[i]
  }
}

  addOption(){
    this.selectOptionValues.push('VALUE' + (this.selectOptionValues.length + 1));
  }

  removeOption(indexOfTheElement: number){
    if (this.selectOptionValues.length > 1) {
      this.selectOptionValues.splice(indexOfTheElement,1);
      this.bufferOptionValues.splice(indexOfTheElement, 1);
    }
  }
}
