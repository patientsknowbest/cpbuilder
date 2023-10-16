import {Component, ComponentRef, OnInit} from '@angular/core';
import {Service} from "../service/service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private mappedComponents: Map<string, ComponentRef<any>>;
  public dialogState = false;
  constructor(private dataService: Service) {
  }

  ngOnInit() {
    this.dataService.currentData.subscribe(observedData => this.mappedComponents = observedData);
    this.dataService.currentDialogState.subscribe(ds => this.dialogState = ds);
  }
}