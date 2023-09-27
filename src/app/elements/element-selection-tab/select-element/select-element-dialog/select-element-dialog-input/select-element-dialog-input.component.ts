import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-select-element-dialog-input',
  templateUrl: './select-element-dialog-input.component.html',
  styleUrls: ['./select-element-dialog-input.component.css']
})
export class SelectElementDialogInputComponent {
  @Input() index: number
  inputField = '';

}
