import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {ElementsComponent} from "../../elements.component";
import {MatDialog} from "@angular/material/dialog";
import {TextElementDialogComponent} from "./text-element-dialog/text-element-dialog.component";

@Component({
  selector: 'app-text-element',
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.css']
})
export class TextElementComponent implements ElementType {
  @Input() name: string = '';
  @Input() position: number;
  @Output() moveUpElement = new EventEmitter<any>();
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  label: string = 'LABEL';
  id: string = 'ID';
  htmlValue = this.generateHtml();

  generateHtml(){
    return '        <div class="row" style="margin-top: 15px;">\n' +
           '            <div class="col-sm-12">\n' +
           '                <label class="cp_label" for="' + this.id + '">' + this.label + '</label>\n' +
           '                <textarea class="form-control" name="' + this.id + '" id="' + this.id + '" rows="3" style="width: 100%;"></textarea>\n' +
           '            </div>\n' +
           '        </div>\n'
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
    this.label = 'LABEL';
    this.id = 'ID';
  }

  close() {
    this.removedElement.emit({
      name: this.name,
    })
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(TextElementDialogComponent, {
        data: {label: this.label, id: this.id},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0) {
          if (result[0] !== '') {
            this.label = result[0];
          }
          if (result[1] !== '') {
            this.id = result[1];
          }

          this.htmlValue = this.generateHtml();
          this.updateHtml.emit({
            label: this.label,
            id: this.id,
          })
        }
      });
    }
  }

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }

}
