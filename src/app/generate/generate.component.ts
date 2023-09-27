import {Component, ComponentRef, OnInit} from '@angular/core';
import {Service} from "../service/service";

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  private mappedComponents: Map<string, ComponentRef<any>>;

constructor(private dataService: Service) {
}
  ngOnInit() {
    this.dataService.currentData.subscribe(observedData => this.mappedComponents = observedData);
    this.dataService.getHtmlValue()
  }

  generateOutputHtmlCode() {
  let concatenatedCode = ['<div class="form-inline">\n' +
  '  <style media="screen">\n' +
  '    a {word-wrap: break-word;}\n' +
  '    .form-group {width: 100%; !important}\n' +
  '    .cp_label {font-size: 18px;font-weight: 900;}\n' +
  '    .cp_whiteBox {background-color:#ffffff; padding:15px; margin-bottom:10px; margin-top:10px; border-radius: 10px; border: 3px solid #014151;}\n' +
  '  </style>' +
  '    <div class="cp_whiteBox">'];
    if (this.mappedComponents.size > 0) {
      this.mappedComponents.forEach(function(value, key)  {
         concatenatedCode.push(value.instance.htmlValue);
         let actualCode = ''
         let s = function (){concatenatedCode.forEach((d)=> {actualCode+=d})}
      });
      concatenatedCode.push('</div>\n</div>');
      let finalHtmlCode = concatenatedCode.join("\r\n")
      concatenatedCode.shift()
      this.dataService.setHtmlValue(finalHtmlCode);
      return finalHtmlCode;
    } else {
      return '';
    }
  }
}
