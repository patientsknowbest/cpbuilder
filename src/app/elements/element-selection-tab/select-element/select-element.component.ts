import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElementType} from "../element-selection-tab.component";
import {MatDialog} from "@angular/material/dialog";
import {SelectElementDialogComponent} from "./select-element-dialog/select-element-dialog.component";
import {Service} from "../../../service/service";
import {ElementsComponent} from "../../elements.component";

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.css']
})
export class SelectElementComponent implements ElementType, OnInit {
  @Input() name: string = '';
  @Input() position: number;
  @Output() moveUpElement = new EventEmitter<any>();
  @Output() removedElement = new EventEmitter<any>();
  @Output() updateHtml = new EventEmitter<any>();
  label:string = 'LABEL';
  selectOptionValues:string[] = ['VALUE1', 'VALUE2', 'VALUE3'];
  htmlValue = this.generateHtml();

  constructor(public dialog: MatDialog, private dataService: Service, public elementComponent: ElementsComponent) {
    this.label = 'LABEL';
  }

  ngOnInit() {}

  generateHtml(){
    return ' <div class="row cp_select-with-label" style="margin-top: 15px;">\n' +
    '  <div class="col-sm-6 input-group">\n' +
    '   <label class="cp_label input-group">' + this.label +
    '   </label>\n' +
    '  </div>\n' +
    '  <div class="col-sm-6 input-group" style="margin-top: 15px;">\n' +
    '   <select class="form-control input-group cp_select" >\n' + this.generateOptions() +
    '   </select>\n' +
    '  </div>\n' +
    ' </div>\n'
  }

  generateOptions() {
    let options = '';
    for (let i = 0; i < this.selectOptionValues.length; i++) {
      console.log('selectOptionValues[i]: ' + this.selectOptionValues[i])
      options += '    <option class="cp-select-option" value="' + this.selectOptionValues[i] + '">' + this.selectOptionValues[i] + '\n' +
      '    </option>\n'
    }
    return options;
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogOpenSate();
      const dialogRef = this.dialog.open(SelectElementDialogComponent, {
        data: {label: this.label, selectOptionValues: this.selectOptionValues}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogOpenSate();
        if (result[0] !== '') {
          this.label = result[0];
          //this.selectOptionValues = result[1]
          this.htmlValue = this.generateHtml();
          this.updateHtml.emit({
            label: this.label,
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
