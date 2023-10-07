import {Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {MatDialog} from '@angular/material/dialog';

import {ElementsComponent} from "../../elements.component";
import {VideoElementDialogComponent} from "./video-element-dialog/video-element-dialog.component";


@Component({
  selector: 'app-video-element',
  templateUrl: './video-element.component.html',
  styleUrls: ['./video-element.component.css']
})
export class VideoElementComponent implements ElementType {
  @Input() name: string = '';
  @Input() position: number;

  @Output() moveUpElement = new EventEmitter<any>();
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  src: string = "https://www.youtube.com/embed/PibKTwL-Jig?si=vUPGiINkJU_7tiTo";
  htmlValue = this.generateHtml();

  generateHtml() {
    return '' +
        '      <div class="cp_video_element" style="margin: auto;">\n' +
        '        <iframe width="520" height="260" allowfullscreen="true" class="cp_video-element-iframe" src="' + this.src +'"></iframe>\n' +
        '      </div>';
  }

  constructor(public dialog: MatDialog, public elementComponent: ElementsComponent) {
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(VideoElementDialogComponent, {
        data: {src: this.src},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0){
          if (result[0] !== this.src) {
            this.src = result[0];
          }
        }

        this.htmlValue = this.generateHtml();
        this.updateHtml.emit({
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

