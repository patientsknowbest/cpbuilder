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
export class SelectElementDialogComponent implements OnInit{

  public label: string;
  public selectOptionValues: string[] = [];
  public bufferArray: string[] = [];
  private currentIndex:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.label = data.label;
    this.selectOptionValues = data.selectOptionValues;
    this.currentIndex = 0;
  }

  ngOnInit() {
    for (let i = 0; i < this.selectOptionValues.length; i++) {
      this.bufferArray.push(this.selectOptionValues[i])
    }
  }

  fillUpBufferArray(){
  for (let i = 0; i < this.bufferArray.length; i++) {
    this.selectOptionValues[i] = this.bufferArray[i]
  }
}

  addOption(){
    this.selectOptionValues.push('VALUE' + (this.selectOptionValues.length + 1));
  }

  removeOption(){
    if (this.selectOptionValues.length > 1) {
      this.selectOptionValues.splice(-1);
      this.bufferArray.splice(-1);
    }
  }
}
