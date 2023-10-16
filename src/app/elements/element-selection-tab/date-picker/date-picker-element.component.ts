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
  id: string = 'ID';
  htmlValue = this.generateHtml();

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
  }

  generateHtml() { return '        <div class="row" style="margin-top: 15px;">\n' +
                          '            <div class="col-sm-6">\n' +
                          '                <label class="cp_label" for="' + this.id + '">' + this.label + '</label>\n' +
                          '            </div>\n' +
                          '            <div class="col-sm-6" style="margin-top: 15px;">\n' +
                          '                <input type="date" name="' + this.id + '" id="' + this.id + '" class="form-control" placeholder="dd/mm/yyyy"/>\n' +
                          '                <span class="help-block">' + this.helpText + '</span>\n' +
                          '            </div>\n' +
                          '        </div>\n';
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(DatePickerElementDialogComponent, {
        data: {label: this.label, helpText: this.helpText, id: this.id},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0){
          if (result[0] !== this.label) {
            this.label = result[0];
          }
          if (result[1] !== '') {
            this.helpText = result[1];
          }
          if (result[2] !== '') {
            this.id = result[2];
          }
        }

        this.htmlValue = this.generateHtml();
        this.updateHtml.emit({
          label: this.label,
          helpText: this.helpText,
          id: this.id
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
