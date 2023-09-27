import {Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {MatDialog} from "@angular/material/dialog";
import {CheckboxElementDialogComponent} from "./checkbox-element-dialog/checkbox-element-dialog.component";
import {ElementsComponent} from "../../elements.component";

@Component({
  selector: 'app-checkbox-element',
  templateUrl: './checkbox-element.component.html',
  styleUrls: ['./checkbox-element.component.css']
})
export class CheckboxElementComponent implements ElementType {
  @ViewChild('checkbox', {read: ViewContainerRef}) checkbox: ViewContainerRef;
  @Input() name: string = '';
  @Input() position: number;
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  @Output() moveUpElement = new EventEmitter<any>();
  label: string = 'LABEL';
  htmlValue = this.generateHtml();
  checkBoxValues:string[] = [];

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
    this.label = 'LABEL';
    this.checkBoxValues = ['VALUE1', 'VALUE2', 'VALUE3'];}

  generateHtml() {
    return ' <div class="row cp_checkbox-element checked" style="margin-top: 15px;">\n' +
      '  <div class="col-sm-6 cp_input-group">\n' +
      '   <p class="cp_label checked">\n' + this.label +
      '   </p>\n' +
      '  </div>\n' +
      '   <div class="col-sm-6" style="margin-top: 15px;">\n' +
      '    <div class="form-check col-xs-12 pull-left input-group">\n' +
      '     <input class="form-check-input form-control checked" type="checkbox" name="cp_checkbox-element-name" value="VALUE"/>\n' +
      '       <label class="cp_label col-xs-10 pull-right checked">\n' + '</label>\n' +
      '    </div>\n' +
      '   </div>\n' +
      '   <div class="form-check col-xs-12 pull-left input-group">\n' +
      '    <input class="form-check-input form-control checked" type="checkbox" name="cp_checkbox-element-name" value="VALUE"/>\n' +
      '    <label class="cp_label col-xs-10 pull-right checked">\n' + '</label>\n' +
      '   </div>\n' +
      '  </div>\n';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckboxElementDialogComponent, {
      data: {label: this.label, checkBoxValues: this.checkBoxValues},
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

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }
}
