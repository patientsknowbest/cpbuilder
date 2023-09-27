import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {
  ElementSelectionTabComponent,
  ElementType
} from './elements/element-selection-tab/element-selection-tab.component';
import {TextElementComponent} from './elements/element-selection-tab/text-element/text-element.component';
import {ElementsComponent} from './elements/elements.component';
import {InputElementComponent} from './elements/element-selection-tab/input-element/input-element.component';
import {
  InputElementDialogComponent
} from './elements/element-selection-tab/input-element/input-element-dialog/input-element-dialog.component'
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Service} from "./service/service";
import {
  TextElementDialogComponent
} from './elements/element-selection-tab/text-element/text-element-dialog/text-element-dialog.component';
import {SelectElementComponent} from './elements/element-selection-tab/select-element/select-element.component';
import {
  SelectElementDialogComponent
} from './elements/element-selection-tab/select-element/select-element-dialog/select-element-dialog.component';
import {RadioElementComponent} from './elements/element-selection-tab/radio-element/radio-element.component';
import {
  RadioElementDialogComponent
} from './elements/element-selection-tab/radio-element/radio-element-dialog/radio-element-dialog.component';
import {CheckboxElementComponent} from './elements/element-selection-tab/checkbox-element/checkbox-element.component';
import {
  CheckboxElementDialogComponent
} from './elements/element-selection-tab/checkbox-element/checkbox-element-dialog/checkbox-element-dialog.component';
import {MoveButtonsComponent} from './elements/shared/move-buttons/move-buttons.component';
import {
  SelectElementDialogInputComponent
} from './elements/element-selection-tab/select-element/select-element-dialog/select-element-dialog-input/select-element-dialog-input.component';
import {AppRoutingModule} from './app-routing-module';
import {GenerateComponent} from './generate/generate.component'
import {AppReuseStrategy} from "./app.reuse.strategy";
import {RouteReuseStrategy} from "@angular/router";
import { BackToTopComponent } from './elements/element-selection-tab/back-to-top/back-to-top.component';
import {PreviewComponent, SafeHtmlPipe} from './preview/preview.component';
import { CheckboxComponent } from './elements/element-selection-tab/checkbox-element/checkbox/checkbox.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ElementSelectionTabComponent,
    TextElementComponent,
    ElementsComponent,
    InputElementComponent,
    InputElementDialogComponent,
    TextElementDialogComponent,
    SelectElementComponent,
    SelectElementDialogComponent,
    RadioElementComponent,
    RadioElementDialogComponent,
    CheckboxElementComponent,
    CheckboxElementDialogComponent,
    MoveButtonsComponent,
    SelectElementDialogInputComponent,
    GenerateComponent,
    BackToTopComponent,
    PreviewComponent,
    SafeHtmlPipe,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    AppRoutingModule,
  ],
  providers: [ElementType, Service, {provide: RouteReuseStrategy, useClass: AppReuseStrategy}, SafeHtmlPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}