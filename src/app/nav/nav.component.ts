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
    this.dataService.currentDialogState.subscribe(ds => this.dialogState = ds)
  }

  emptyingTheEditor() {
    /**
     By destroying the elements of the map this component unsubscribes from the datasource.
     This step has to be done first otherwise the deletion would not work because after
     deleting the items of the map it would retrieve again them from the datasource due to the live subscription.
     **/
    this.mappedComponents.forEach(a => a.destroy())
    this.mappedComponents.forEach((a,v) => {
      this.mappedComponents.delete(v)
    })
    this.dataService.changeIndex(0);
    this.dataService.changeCurrentData(new Map<string, ComponentRef<any>>())
    this.dataService.setHtmlValue('')
    this.dataService.changeIndex(0);
    this.dataService.changePosition(0);
  }
}
