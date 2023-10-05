import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {MatDialog} from "@angular/material/dialog";
import {ElementsComponent} from "../../elements.component";
import {RadioElementDialogComponent} from "./radio-element-dialog/radio-element-dialog.component";

@Component({
  selector: 'app-radio-element',
  templateUrl: './radio-element.component.html',
  styleUrls: ['./radio-element.component.css']
})
export class RadioElementComponent implements ElementType {
  @Input() name: string = '';
  @Input() position: number;
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  @Output() moveUpElement = new EventEmitter<any>();
  label:string = 'LABEL';
  radioButtonValues:string[] = ['VALUE1', 'VALUE2', 'VALUE3'];
  htmlValue = this.generateHtml();

  generateHtml() {
    return ' <div class="row cp_radio-element" style="margin-top: 15px;">\n' +
      '  <div class="col-sm-6 input-group">\n' +
      '   <p class="cp_label checked">\n' + this.label +
      '   </p>\n' +
      '  </div>\n' + this.generateRadioOptions() +
      ' </div>\n'
  }
  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
    this.label = 'LABEL';
    this.radioButtonValues = ['VALUE1', 'VALUE2', 'VALUE3'];}

  openDialog(): void {
    const dialogRef = this.dialog.open(RadioElementDialogComponent, {
      data: {label: this.label, inputValues: this.radioButtonValues},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result[0] !== '') {
        this.label = result[0];
        this.htmlValue = this.generateHtml();
        this.updateHtml.emit({
          label: this.label,
        })
      }
    });
  }

  generateRadioOptions(){
    let options = '';
    console.log(this.radioButtonValues)
    for (let i = 0; i < this.radioButtonValues.length; i++) {
      options +=       '  <div class="form-check input-group">\n' +
          '    <input class="cp_input form-check-input col-xs-1 checked" type="radio" name="cp-radio-button-element-name" value="'+ this.radioButtonValues[i] + '">\n' +
          '    <label class="cp_label form-check-label col-xs-10 checked" value="' + this.radioButtonValues[i] +'">' + this.radioButtonValues[i] + '</label>\n' +
          '  </div>\n';
    }
    return options;
  }

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }
}
