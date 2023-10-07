import {Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {MatDialog} from '@angular/material/dialog';
import {InputElementDialogComponent} from "./input-element-dialog/input-element-dialog.component";
import {ElementsComponent} from "../../elements.component";


@Component({
  selector: 'app-input-element',
  templateUrl: './input-element.component.html',
  styleUrls: ['./input-element.component.css']
})

export class InputElementComponent implements ElementType {
  @Input() name: string = '';
  @Input() position: number;

  @Output() moveUpElement = new EventEmitter<any>();
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  helpText: string = 'HELP TEXT';
  label: string = 'LABEL';
  placeholder: string = 'PLACEHOLDER';
  htmlValue = this.generateHtml();

  generateHtml() {
    return '      <div class="row cp_input-element" style="margin-top: 15px;">\n' +
      '          <div class="col-sm-6 input-group">\n' +
      '             <label class="cp-label cp-input-with-label">' + this.label + '</label></div>\n' +
      '             <div class="col-sm-6 input-group" style="margin-top: 15px;">\n' +
      '               <input type="text" class="cp_input form-control" style="width: 100%;" placeholder="' + this.placeholder + '" value="">\n' +
      '               <span>' + this.helpText + '</span>\n' +
      '             </div>\n' +
      '       </div>';
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(InputElementDialogComponent, {
        data: {label: this.label, placeholder: this.placeholder, helpText: this.helpText},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0){
        if (result[0] !== this.label) {
          this.label = result[0];
        }
        if (result[1] !== '') {
          this.placeholder = result[1];
        }
        if (result[2] !== '') {
          this.helpText = result[2];
        }
        }

        this.htmlValue = this.generateHtml();
        this.updateHtml.emit({
          placeholder: this.placeholder,
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
