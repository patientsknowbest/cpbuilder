import {Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {ElementsComponent} from "../../elements.component";

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

  htmlValue = this.generateHtml();

  generateHtml() {
    return '      <hr class="cp_separator" style="height: 3px; background-color: black; margin: 50px auto;width: 80%;"/>';
  }

  constructor(public elementComponent: ElementsComponent) {
  }

  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }
}

