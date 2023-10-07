import {Component, EventEmitter, Input, Output, Type, ViewContainerRef} from '@angular/core';
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
  htmlValue = this.generateHtml();

  generateHtml(){
    return '     <div class="row cp_text-element" style="margin-top: 15px;">\n' +
      '       <div class="cp_text-element-group">\n' +
      '          <label class="cp_text-element-label" >' + this.label + '</label>\n' +
      '          <textarea class="cp_text-element-text-area" rows="3" style="width: 100%;"></textarea>\n' +
      '       </div>\n' +
      '    </div>'
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {

    this.label = 'LABEL';

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
        data: {label: this.label},
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

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }

}
