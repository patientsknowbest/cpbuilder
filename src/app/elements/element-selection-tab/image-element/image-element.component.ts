import {Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {MatDialog} from "@angular/material/dialog";
import {ElementsComponent} from "../../elements.component";
import {InputElementDialogComponent} from "../input-element/input-element-dialog/input-element-dialog.component";
import {ImageElementDialogComponent} from "./image-element-dialog/image-element-dialog.component";

@Component({
  selector: 'app-image-element',
  templateUrl: './image-element.component.html',
  styleUrls: ['./image-element.component.css']
})
export class ImageElementComponent implements ElementType {
  @Input() name: string = '';
  @Input() position: number;

  @Output() moveUpElement = new EventEmitter<any>();
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  label: string = 'LABEL';
  src: string = '';
  htmlValue = this.generateHtml();

  generateHtml() {
    return '' +
        '      <div class="cp_image-element">\n' +
        '        <label class="cp_image-elementlabel input-group" >' + this.label + '</label><br>\n' +
        '        <img class="cp_image" src="' + this.src + '" alt="ALT TEXT" style="max-width: 360px; max-height: 360px; margin: auto;" width="100%" height="auto">\n' +
        '      </div>';
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(ImageElementDialogComponent, {
        data: {label: this.label, src: this.src},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0){
          if (result[0] !== this.label) {
            this.label = result[0];
          }
          if (result[1] !== '') {
            this.src = result[1];
          }
        }

        this.htmlValue = this.generateHtml();
        this.updateHtml.emit({
          label: this.label,
          src: this.src,
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

