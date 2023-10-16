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

  altText: string = 'ALT TEXT';
  src: string = '';
  htmlValue = this.generateHtml();

  generateHtml() {
    return '        <img src="' + this.src + '" alt="' + this.altText + '" style="max-width: 720px; width: 100%; height: auto; margin-top: 15px;"></img>\n';
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(ImageElementDialogComponent, {
        data: {altText: this.altText, src: this.src},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0){
          if (result[0] !== this.altText) {
            this.altText = result[0];
          }
          if (result[1] !== '') {
            this.src = result[1];
          }
        }

        this.htmlValue = this.generateHtml();
        this.updateHtml.emit({
          altText: this.altText,
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

