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
  checkBoxIds:string[] = ['ID1', 'ID2', 'ID3'];
  checkBoxAttributeValues:string[] = ['ATTR_VALUE1', 'ATTR_VALUE2', 'ATTR_VALUE3'];
  htmlValue = this.generateHtml();

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
    this.label = 'LABEL';}

  generateHtml() {
    return '        <div class="row" style="margin-top: 15px;">\n' +
           '            <div class="col-sm-6">\n' +
           '                <p class="cp_label">' + this.label + '</p>\n' +
           '            </div>\n' +
           '            <div class="col-sm-6" style="margin-top: 15px;">\n' + 
                            this.generateCheckboxes() +
           '            </div>\n' +
           '        </div>\n';
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(CheckboxElementDialogComponent, {
        data: {label: this.label, checkBoxValues: this.checkBoxValues, checkBoxIds: this.checkBoxIds, checkBoxAttributeValues: this.checkBoxAttributeValues},
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
      options += '                <div class="row">\n' + 
                 '                    <div class="form-check col-xs-12 pull-left">\n' + 
                 '                        <input class="form-check-input form-control" style="margin: 0; height: 20px;" type="checkbox" name="' + this.checkBoxIds[i] + '" id="' + this.checkBoxIds[i] + '" value="' + this.checkBoxAttributeValues[i] + '"/>\n' + 
                 '                        <label class="cp_label col-xs-10 pull-right" style="margin-bottom: 0px;" for="' + this.checkBoxIds[i] + '">' + this.checkBoxValues[i] + '</label>\n' + 
                 '                    </div>\n' +
                 '                </div>\n';
    }    
    return options;
  }

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }
}
