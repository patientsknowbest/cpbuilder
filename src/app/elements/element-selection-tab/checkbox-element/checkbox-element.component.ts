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
  checkBoxValues:string[] = ['VALUE1', 'VALUE2', 'VALUE3'];
  htmlValue = this.generateHtml();

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
    this.label = 'LABEL';}

  generateHtml() {
    return '     <div class="row cp_checkbox-element" style="margin-top: 15px;">\n' +
      '       <p class="cp_checkbox-element-label">' + this.label + '</p>\n' +
      '       <div class=cp_checkbox-element-wraper" style="margin-top: 15px;">\n' +
      '         <div class="cp_checkbox-options">\n' + this.generateCheckboxes() +
      '         </div>\n' +
      '       </div>\n' +
      '     </div>';
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(CheckboxElementDialogComponent, {
        data: {label: this.label, checkBoxValues: this.checkBoxValues},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0){
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

  generateCheckboxes() {
    let options = '';
    for (let i = 0; i < this.checkBoxValues.length; i++) {
      options += '           <div><input class="cp_checkbox-option" type="checkbox" value="' + this.checkBoxValues[i] + '"><label class="cp_label col-xs-10 pull-right">' + this.checkBoxValues[i] + '</label></div>\n';
    }
    return options;
  }

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }
}
