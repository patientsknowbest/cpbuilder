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
    return '' +
    '      <div class="cp_go-to-save-cp-container">\n' +
    '        <button class="cp_go-to-save-cp-button" title="Back to Top" style="margin-top:15px; margin-bottom:15px;"><a href="#fileUploadForm_save">Go to Save Care Plan</a></button>\n' +
    '      </div>';
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
