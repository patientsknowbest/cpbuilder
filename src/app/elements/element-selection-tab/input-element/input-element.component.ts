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
  id: string = 'ID'
  htmlValue = this.generateHtml();

  generateHtml() {
    return '        <div class="row" style="margin-top: 15px;">\n' +
           '            <div class="col-sm-6">\n' +
           '                <label class="cp-label" for="' + this.id + '">' + this.label + '</label>\n' +
           '            </div>\n' +
           '            <div class="col-sm-6" style="margin-top: 15px;">\n' +
           '                <input type="text" name="' + this.id + '" id="' + this.id + '" class="form-control" style="width: 100%;" placeholder="' + this.placeholder + '"/>\n' +
           '                <span class="help-block">' + this.helpText + '</span>\n' +
           '            </div>\n' +
           '        </div>\n';
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(InputElementDialogComponent, {
        data: {label: this.label, placeholder: this.placeholder, helpText: this.helpText, id: this.id},
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
        if (result[3] !== '') {
          this.id = result[3];
        }
        }

        this.htmlValue = this.generateHtml();
        this.updateHtml.emit({
          placeholder: this.placeholder,
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
