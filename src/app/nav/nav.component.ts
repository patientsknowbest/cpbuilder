import {Component, ComponentRef, OnInit} from '@angular/core';
import {Service} from "../service/service";
import {GenerateComponent} from "../generate/generate.component";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private mappedComponents: Map<string, ComponentRef<any>>;

  constructor(private dataService: Service) {
  }

  ngOnInit() {
    this.dataService.currentData.subscribe(observedData => this.mappedComponents = observedData);
  }

  emptyingTheEditor() {
    /**
     By destroying the elements of the map this component unsubscribes from the datasource.
     This step has to be done first otherwise the deletion would not work because after
     deleting the items of the map it would retrieve again them from the datasource due to the live subscription.
     **/
    this.mappedComponents.forEach(componentRef => componentRef.destroy())
    this.mappedComponents.forEach((componentRef,keyValue) => {
      this.mappedComponents.delete(keyValue)
    })
  }
}
