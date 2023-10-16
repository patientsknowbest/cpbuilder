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
  radioButtonValues: string[] = ['VALUE1', 'VALUE2', 'VALUE3'];
  radioButtonIds: string[] = ['ID1', 'ID2', 'ID3'];
  htmlValue = this.generateHtml();

  generateHtml() {
    return '        <div class="row" style="margin-top: 15px;">\n' +
           '            <div class="col-sm-6">\n' +
           '                <p class="cp_label">' + this.label + '</p>\n' +
           '            </div>\n' + 
           '            <div class="col-sm-6" style="margin-top: 15px;">\n' +
                        this.generateRadioOptions() + '\n' +
           '            </div>\n' +      
           '        </div>\n'
  }
  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
    this.label = 'LABEL';
    this.radioButtonValues = ['VALUE1', 'VALUE2', 'VALUE3'];
    this.radioButtonIds = ['ID1', 'ID2', 'ID3'];
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(RadioElementDialogComponent, {
        data: {label: this.label, inputValues: this.radioButtonValues, inputIds: this.radioButtonIds},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0) {
          if (result[0] !== '') {
            this.label = result[0];
            this.htmlValue = this.generateHtml();
            this.updateHtml.emit({
              label: this.label,
            })
          }
        }
        });
    }
  }

  generateRadioOptions(){
    let options = '';
    for (let i = 0; i < this.radioButtonValues.length; i++) {
      options += '                <div class="row">\n' +
                 '                    <div class="form-check">\n' +
                 '                        <input class="form-check-input col-xs-1" type="radio" name="' + this.radioButtonIds[i] + '" id="' + this.radioButtonIds[i] + '" value="'+ this.radioButtonValues[i] + '">\n' +
                 '                            <label class="form-check-label col-xs-10" for="' + this.radioButtonIds[i] + '">' + this.radioButtonValues[i] + '</label>\n' +
                 '                        </input>\n' +
                 '                    </div>\n' +
                 '                </div>';
      if (i+1 < this.radioButtonValues.length) {
        options += '\n';
      }
    }
    return options;
  }

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }
}
