import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {Service} from "../service/service";
import {DomSanitizer} from "@angular/platform-browser";
import {GenerateComponent} from "../generate/generate.component";

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  // @ts-ignore
  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit{
  // @ts-ignore
  @ViewChild("userHtml", { static: false }) userHtml;

  htmlCode: string;

  constructor(private dataService: Service, public generateComponent: GenerateComponent) {
  }

  ngOnInit() {
    this.generateComponent.ngOnInit();
    this.generateComponent.generateOutputHtmlCode();
    this.dataService.getHtmlValue().subscribe(observedData => this.htmlCode = observedData);
  }


}
