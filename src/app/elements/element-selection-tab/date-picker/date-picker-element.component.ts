import {Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {MatDialog} from "@angular/material/dialog";
import {ElementsComponent} from "../../elements.component";
import {InputElementDialogComponent} from "../input-element/input-element-dialog/input-element-dialog.component";
import {DatePickerElementDialogComponent} from "./date-picker-dialog/date-picker-element-dialog.component";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker-element.component.html',
  styleUrls: ['./date-picker-element.component.css']
})
export class DatePickerElementComponent implements ElementType {
  @Input() name: string = '';
  @Input() position: number;

  @Output() moveUpElement = new EventEmitter<any>();
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  helpText: string = 'HELP TEXT';
  label: string = 'LABEL';
  htmlValue = this.generateHtml();

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
  }

  generateHtml() { return '      <div class="row cp_date-picker" style="margin-top: 15px;">\n' +
    '         <div class="cp_date-picker-label-container">\n' +
    '             <label class="cp_date-picker-label">' + this.label + '</label>\n' +
    '         </div>\n' +
    '         <div class="cp_date-picker-input-container" style="margin-top: 15px;">\n' +
    '             <input type="date" class="cp_date-picker_input" placeholder="dd/mm/yyyy"/><br>\n' +
    '             <span class="cp_date-picker-help-text">' + this.helpText + '</span>\n' +
    '         </div>\n' +
    '      </div>';
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(DatePickerElementDialogComponent, {
        data: {label: this.label, helpText: this.helpText},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0){
          if (result[0] !== this.label) {
            this.label = result[0];
          }
          if (result[2] !== '') {
            this.helpText = result[1];
          }
        }

        this.htmlValue = this.generateHtml();
        this.updateHtml.emit({
          label: this.label,
          helpText: this.helpText
        })
      });
    }
  }

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }

}
