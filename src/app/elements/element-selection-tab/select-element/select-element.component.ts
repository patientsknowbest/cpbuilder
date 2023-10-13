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
  label: string = 'LABEL';
  selectOptionValues: string[] = ['VALUE1', 'VALUE2', 'VALUE3'];
  id: string = 'ID'
  htmlValue = this.generateHtml();

  constructor(public dialog: MatDialog, private dataService: Service, public elementComponent: ElementsComponent) {
    this.label = 'LABEL';
    this.id = 'ID';
  }

  ngOnInit() {}

  generateHtml(){
    return '        <div class="row" style="margin-top: 15px;">\n' +
           '            <div class="col-sm-6">\n' +
           '                <label class="cp_label for="' + this.id + '">' + this.label + '</label>\n' +
           '            </div>\n' +
           '            <div class="col-sm-6" style="margin-top: 15px;">\n' +
           '                <select class="form-control" name="' + this.id + '" id="' + this.id + '">\n' +
                                this.generateOptions() +
           '                </select>\n' +
           '            </div>\n' +
           '        </div>\n'
  }

  generateOptions() {
    let options = '';
    for (let i = 0; i < this.selectOptionValues.length; i++) {
      options += '                    <option value="' + this.selectOptionValues[i] + '">' + this.selectOptionValues[i] + '</option>\n'
    }
    return options;
  }

  openDialog(): void {
    if (!this.elementComponent.isDialogOpen) {
      this.elementComponent.changeDialogState();
      const dialogRef = this.dialog.open(SelectElementDialogComponent, {
        data: {label: this.label, selectOptionValues: this.selectOptionValues, id: this.id}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.elementComponent.changeDialogState();
        if (result.length != 0){
          if (result[0] !== '') {
            this.label = result[0];
          }
          if (result[1] !== '') {
            this.id = result[1];
          }
          this.htmlValue = this.generateHtml();
          this.updateHtml.emit({
            label: this.label,
            id: this.id,
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
