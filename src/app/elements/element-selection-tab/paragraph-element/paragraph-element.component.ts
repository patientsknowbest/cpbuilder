import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElementType } from '../element-selection-tab.component';
import { MatDialog } from '@angular/material/dialog';
import { ElementsComponent } from '../../elements.component';
import { ParagraphElementDialogComponent } from './paragraph-element-dialog/paragraph-element-dialog.component';

@Component({
  selector: 'app-paragraph-element',
  templateUrl: './paragraph-element.component.html',
  styleUrls: ['./paragraph-element.component.css']
})
export class ParagraphElementComponent implements ElementType{
  @Input() name: string = '';
  @Input() position: number;
  @Output() moveUpElement = new EventEmitter<any>();
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  paragraph: string = 'PARAGRAPH';
  htmlValue = this.generateHtml();

  generateHtml(){
    return '        <div class="row" style="margin-top: 15px;">\n' +
           '            <div class="col-sm-12">\n' +
           '                <p class="cp_paragraph" style="width: 100%;">' + this.paragraph +'</p>\n' +
           '            </div>\n' +
           '        </div>\n'
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
    this.paragraph = 'PARAGRAPH';
  }

  close() {
    this.removedElement.emit({
      name: this.name,
    })
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(ParagraphElementDialogComponent, {
        data: {paragraph: this.paragraph},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0) {
          if (result[0] !== '') {
            this.paragraph = result[0];
          }

          this.htmlValue = this.generateHtml();
          this.updateHtml.emit({
            paragraph: this.paragraph,
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
