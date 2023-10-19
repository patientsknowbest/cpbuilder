import {Component, ComponentRef, Injectable, OnInit, Type, ViewChild, ViewContainerRef, ViewRef} from '@angular/core'
import {TextElementComponent} from "./element-selection-tab/text-element/text-element.component";
import {InputElementComponent} from "./element-selection-tab/input-element/input-element.component";
import {Service} from "../service/service";
import {SelectElementComponent} from "./element-selection-tab/select-element/select-element.component";
import {RadioElementComponent} from "./element-selection-tab/radio-element/radio-element.component";
import {CheckboxElementComponent} from "./element-selection-tab/checkbox-element/checkbox-element.component";
import {BackToTopComponent} from "./element-selection-tab/back-to-top/back-to-top.component";
import {DatePickerElementComponent} from "./element-selection-tab/date-picker/date-picker-element.component";
import {SeparatorElementComponent} from "./element-selection-tab/separator-element/separator-element.component";
import {ImageElementComponent} from "./element-selection-tab/image-element/image-element.component";
import {VideoElementComponent} from "./element-selection-tab/video-element/video-element.component";
import {
  GoToSaveCpElementComponent
} from "./element-selection-tab/go-to-save-cp-element/go-to-save-cp-element.component";
import { ParagraphElementComponent } from './element-selection-tab/paragraph-element/paragraph-element.component';
import {MatDialog} from "@angular/material/dialog";
import { ClearEditorDialogComponent } from './clear-editor-dialog/clear-editor-dialog.component';


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
  private position = 0;
  public isDialogOpen: boolean = false;
  private delete: boolean;

  private componentTypes: any = {
    textType: 'textElementComponent',
    paragraphType: 'paragraphElementComponent',
    inputType: 'inputElementComponent',
    selectType: 'selectElementComponent',
    radioType: 'radioElementComponent',
    checkType: 'checkElementComponent',
    backToTopType: 'backToTopElementComponent',
    datePickerType: 'datePickerElementComponent',
    separatorType: 'separatorElementComponent',
    imageType: 'imageElementComponent',
    videoType: 'videoElementComponent',
    goToSaveCPType: 'goToSaveCpElementComponent'
  }

  constructor(private service: Service, public dialog: MatDialog) {
    service.currentPosition.subscribe()
  }

  ngOnInit() {
    this.service.currentData.subscribe(m => this.components = m);
    this.service.currentPosition.subscribe(p => this.position = p);
    this.service.currentIndex.subscribe(i => this.indexNumber = i);
    this.service.currentDialogState.subscribe(ds => this.isDialogOpen = ds);
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
    component.instance.position = this.position;
    this.components.set(uniqueName, component);
    this.indexNumber++;
    this.position++;
  }

  moveDown(currentPosition: number, name: string){
    let newPosition = currentPosition + 1;

    if (newPosition < this.components.size){
      // @ts-ignore
      let nextElementComponentRef : ComponentRef<any> = ComponentRef;
      for (let i = 0; i <= this.indexNumber; i++) {
        if (this.components.get(i.toString())?.instance.position == newPosition){
          nextElementComponentRef = <ComponentRef<any>>this.components.get(i.toString());
          break;
        }
      }
      let currentViewRef = <ViewRef>this.components.get(name)?.hostView
      let currentComponent = <ComponentRef<any>>this.components.get(name)
      this.container.move(currentViewRef, newPosition)
      currentComponent.instance.position = newPosition;
      nextElementComponentRef.instance.position = currentPosition;
    }
  }

  moveUp(currentPosition: number, name: string){
    let newPosition = currentPosition - 1;

    if (newPosition >= 0){
      // @ts-ignore
      let nextElementComponentRef : ComponentRef<any> = ComponentRef;
      for (let i = 0; i < this.indexNumber; i++) {
        if (this.components.get(i.toString())?.instance.position === (currentPosition - 1)){
          nextElementComponentRef = <ComponentRef<any>>this.components.get(i.toString());
          break;
        }
      }
      let currentViewRef = <ViewRef>this.components.get(name)?.hostView
      let currentComponent = <ComponentRef<any>>this.components.get(name)
      this.container.move(currentViewRef, newPosition)
      currentComponent.instance.position = newPosition;
      nextElementComponentRef.instance.position = currentPosition;
    }
  }

  getComponentType(type: string) {
    let actualType: Type<any>;
    switch (type) {
      case this.componentTypes.textType: {
        actualType = TextElementComponent;
        break;
      }
      case this.componentTypes.paragraphType: {
        actualType = ParagraphElementComponent;
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
      case this.componentTypes.datePickerType: {
        actualType = DatePickerElementComponent;
        break;
      }
      case this.componentTypes.separatorType: {
        actualType = SeparatorElementComponent;
        break;
      }
      case this.componentTypes.imageType: {
        actualType = ImageElementComponent
        break;
      }
      case this.componentTypes.videoType: {
        actualType = VideoElementComponent
        break;
      }
      case this.componentTypes.goToSaveCPType: {
        actualType = GoToSaveCpElementComponent
        break;
      }
    }
    // @ts-ignore
    return actualType;
  }

  changeDialogState(){
    this.isDialogOpen = !this.isDialogOpen;
    this.service.changeDialogState(this.isDialogOpen);
  }

  deleteComponent(componentName: string) {
    let currentPositionOfElementToDelete = this.components.get(componentName)?.instance.position;

      this.components.forEach(value => {
        if (value.instance.position > currentPositionOfElementToDelete){
          value.instance.position = value.instance.position - 1;
        }
      })
      this.components.get(componentName)?.destroy();
      this.components.delete(componentName);
      this.position--;
  }

  
  emptyingTheEditor() {
        /**
     By destroying the elements of the map this component unsubscribes from the datasource.
     This step has to be done first otherwise the deletion would not work because after
     deleting the items of the map it would retrieve again them from the datasource due to the live subscription.
     **/
     this.components.forEach(a => a.destroy())
     this.components.forEach((a,v) => {
       this.components.delete(v)
     })
     this.service.changeIndex(0);
     this.service.changeCurrentData(new Map<string, ComponentRef<any>>())
     this.service.setHtmlValue('')
     this.service.changePosition(0);
  }

  openDialog(): void {
    if (!this.isDialogOpen) {
      this.changeDialogState();
      const dialogRef = this.dialog.open(ClearEditorDialogComponent, {
        data: {delete: this.delete}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.changeDialogState();
        if (result == true) {
          this.emptyingTheEditor();
        } 
      });
    }
  }
}