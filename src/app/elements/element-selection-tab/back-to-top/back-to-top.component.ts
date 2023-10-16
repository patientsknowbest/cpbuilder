import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ElementsComponent} from "../../elements.component";

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css']
})
export class BackToTopComponent implements OnInit{
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
    return '     <button class="cp_button-back-to-top" title="Back to Top" ><a href="#top">Back To Top</a></button>';
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
}