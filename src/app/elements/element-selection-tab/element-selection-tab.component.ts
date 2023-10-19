import {Component, Injectable, Input} from '@angular/core';
import {TextElementComponent} from "./text-element/text-element.component";
import {ElementsComponent} from "../elements.component";
import {InputElementComponent} from "./input-element/input-element.component";

@Component({
  selector: 'app-element-selection-tab',
  templateUrl: './element-selection-tab.component.html',
  styleUrls: ['./element-selection-tab.component.css']
})
export class ElementSelectionTabComponent {
  textType: string;
  paragraphType: string;
  inputType: string;
  selectType: string;
  radioType: string;
  checkType: string;
  backToTopType: string;
  datePickerType: string;
  separatorType: string;
  imageType: string;
  videoType: string;
  goToSaveCPType: string;

  constructor(public elementComponent: ElementsComponent) {
    this.textType = 'textElementComponent';
    this.paragraphType = 'paragraphElementComponent';
    this.inputType = 'inputElementComponent';
    this.selectType = 'selectElementComponent';
    this.radioType = 'radioElementComponent';
    this.checkType = 'checkElementComponent';
    this.backToTopType = 'backToTopElementComponent';
    this.datePickerType = 'datePickerElementComponent';
    this.separatorType = 'separatorElementComponent';
    this.imageType = 'imageElementComponent';
    this.videoType = 'videoElementComponent';
    this.goToSaveCPType = 'goToSaveCpElementComponent';

  }

  public createComponent(element: string): void {
    this.elementComponent.addComponent(element);
  }
}

@Injectable()
export class ElementType {

}

