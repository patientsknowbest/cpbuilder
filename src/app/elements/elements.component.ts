import {Component, ComponentRef, Injectable, OnInit, Type, ViewChild, ViewContainerRef, ViewRef} from '@angular/core'
import {TextElementComponent} from "./element-selection-tab/text-element/text-element.component";
import {InputElementComponent} from "./element-selection-tab/input-element/input-element.component";
import {Service} from "../service/service";
import {SelectElementComponent} from "./element-selection-tab/select-element/select-element.component";
import {RadioElementComponent} from "./element-selection-tab/radio-element/radio-element.component";
import {CheckboxElementComponent} from "./element-selection-tab/checkbox-element/checkbox-element.component";
import {BackToTopComponent} from "./element-selection-tab/back-to-top/back-to-top.component";

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})

@Injectable()
export class ElementsComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  public components = new Map<string, ComponentRef<any>>();
  private indexNumber = 0;
  public isDialogOpen: boolean = false;

  private componentTypes: any = {
    textType: 'textElementComponent',
    inputType: 'inputElementComponent',
    selectType: 'selectElementComponent',
    radioType: 'radioElementComponent',
    checkType: 'checkElementComponent',
    backToTopType: 'backToTopElementComponent'
  }

  constructor(private service: Service) {
  }

  ngOnInit() {
    this.service.currentData.subscribe(m => this.components = m);
  }

  public addComponent(componentName: string) {
    let componentType = this.getComponentType(componentName);
    let uniqueName = this.indexNumber.toString();
    let component: any = '';

    if (componentType != undefined) {
      component = this.container.createComponent(componentType);
    }

    component.instance.removedElement.subscribe((res: any) => {
      this.deleteComponent(res.name)
    })

    component.instance.updateHtml.subscribe((h: any) => {
      component.instance.value = h.value;
      component.instance.label = h.label;
      component.instance.helpText = h.helpText;
    })

    component.instance.name = uniqueName;
    component.instance.position = this.indexNumber;
    this.components.set(uniqueName, component);
    this.indexNumber++;
  }

  moveComponentDown(currentPosition: number, name: string){
    let newPosition = currentPosition + 1;

    if (newPosition < this.components.size){
      // @ts-ignore
      let next : ComponentRef<any> = ComponentRef;
      for (let i = 0; i < this.components.size; i++) {
        if (this.components.get(i.toString())?.instance.position === (currentPosition + 1)){
          next = <ComponentRef<any>>this.components.get(i.toString());
        }
      }
      let currentViewRef = <ViewRef>this.components.get(name)?.hostView
      let currentComponent = <ComponentRef<any>>this.components.get(name)
      this.container.move(currentViewRef, newPosition)
      currentComponent.instance.position = newPosition;
      let positionOfNextElement: number = next.instance.position
      next.instance.position = positionOfNextElement - 1;
    }
  }

  moveComponentUp(currentPosition: number, name: string){
    let newPosition = currentPosition - 1;

    if (newPosition >= 0){
      // @ts-ignore
      let next : ComponentRef<any> = ComponentRef;
      for (let i = 0; i < this.components.size; i++) {
        if (this.components.get(i.toString())?.instance.position === (currentPosition - 1)){
          next = <ComponentRef<any>>this.components.get(i.toString());
        }
      }
      let currentViewRef = <ViewRef>this.components.get(name)?.hostView
      let currentComponent = <ComponentRef<any>>this.components.get(name)
      this.container.move(currentViewRef, newPosition)
      currentComponent.instance.position = newPosition;
      let positionOfNextElement: number = next.instance.position
      next.instance.position = positionOfNextElement + 1;
    }
  }

  getComponentType(type: string) {
    let actualType: Type<any>;
    switch (type) {
      case this.componentTypes.textType: {
        actualType = TextElementComponent;
        break;
      }
      case this.componentTypes.inputType: {
        actualType = InputElementComponent;
        break;
      }
      case this.componentTypes.selectType: {
        actualType = SelectElementComponent;
        break;
      }
      case this.componentTypes.radioType: {
        actualType = RadioElementComponent;
        break;
      }
      case this.componentTypes.checkType: {
        actualType = CheckboxElementComponent;
        break;
      }
      case this.componentTypes.backToTopType: {
        actualType = BackToTopComponent;
        break;
      }
    }
    // @ts-ignore
    return actualType;
  }

  changeDialogOpenSate(){
    this.isDialogOpen = !this.isDialogOpen;
  }

  deleteComponent(componentName: string) {
    if (this.components.has(componentName)) {
      this.components.get(componentName)?.destroy();
      this.components.delete(componentName);
    }
  }
}


