import {Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {ElementsComponent} from "../../elements.component";
import {MatDialog} from "@angular/material/dialog";
import { SeparatorElementDialogComponent } from './separator-element-dialog/separator-element-dialog.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-separator-element',
  templateUrl: './separator-element.component.html',
  styleUrls: ['./separator-element.component.css']
})
export class SeparatorElementComponent implements ElementType {
  @Input() name: string = '';
  @Input() position: number;

  @Output() moveUpElement = new EventEmitter<any>();
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  height: string = "3"
  color: string = "#000000"
  separatorStyle: string = "height: "+ this.height +"px; background-color: "+ this.color +"; margin: 20px auto;width: 100%;";
  htmlValue = this.generateHtml();

  generateHtml() {
    return '        <hr class="cp_separator" style="height: ' + this.height + 'px; background-color: ' + this.color + '; margin: 50px auto;width: 80%;"/>\n';
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
    this.height = '3';
    this.color = "#000000";
    this.separatorStyle = "height: "+ this.height +"px; background-color: " + this.color + "; margin: 20px auto;width: 100%;";
  }

  close() {
    this.removedElement.emit({
      name: this.name,
    })
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(SeparatorElementDialogComponent, {
        data: {height: this.height, color: this.color},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0) {




          console.log(result[1]);
          
          if (result[0] !== '') {
            this.height = result[0];
            this.color = result[1];
            this.separatorStyle = "height: "+ result[0] +"px; background-color: "+ result[1] +"; margin: 20px auto;width: 100%;";
          }

          this.htmlValue = this.generateHtml();
          this.updateHtml.emit({
            height: this.height,
            color: this.color,
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

