import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementsComponent} from "../../elements.component";

@Component({
  selector: 'app-go-to-save-cp-element',
  templateUrl: './go-to-save-cp-element.component.html',
  styleUrls: ['./go-to-save-cp-element.component.css']
})
export class GoToSaveCpElementComponent implements OnInit{
@Input() name: string = '';
@Input() position: number;

@Output() removedElement = new EventEmitter<any>();
@Output() updateHtml = new EventEmitter<any>();
@ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  htmlValue = this.generateHtml();

  ngOnInit() {
    this.scrollToTop();
  }

  generateHtml() {
    return '        <a href="#fileUploadForm_save" class="btn arrow btn-primary" title="Back to Top" alt="Click here to save the Care Plan" style="margin-top:15px; margin-bottom:15px;">Go to Save Care Plan</a>\n';
  }

  constructor(public elementComponent: ElementsComponent) {}


  removeElement() {
    this.removedElement.emit({
      name: this.name,
    })
  }

  scrollToTop() {

    (function smoothscroll() {

      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {

        window.requestAnimationFrame(smoothscroll);

        window.scrollTo(0, currentScroll - (currentScroll / 8));

      }

    })();
  }
  moveDownElement(){

  }
}
