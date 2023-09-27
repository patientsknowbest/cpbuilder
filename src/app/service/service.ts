import {ComponentRef, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {PreviewComponent} from "../preview/preview.component";
import {STRING_TYPE} from "@angular/compiler";

@Injectable()
export class Service{
  private dataToPass = new BehaviorSubject<Map<string,ComponentRef<any>>>(new Map<string,ComponentRef<any>>);
  private htmlCodeToPreview = new BehaviorSubject(STRING_TYPE.name.toString());
  private myBehaviorSubject = new BehaviorSubject<string>('');
  private numberOfSelectOptions = new BehaviorSubject<string[]>(['VALUE1', 'VALUE2', 'VALUE3']);


  currentData = this.dataToPass.asObservable();
  currentHtmlCode = this.htmlCodeToPreview.asObservable();
  currentNumberOfSelectOptions = this.numberOfSelectOptions.asObservable();

  changeCurrentData(m: Map<string, ComponentRef<any>>) {
    this.dataToPass.next(m)
  }

  checkHtmlCodeChange(s: string) {
    this.htmlCodeToPreview.getValue();
  }

  setNumberOfSelectOption(num: string[]) {
    this.numberOfSelectOptions.next(num);
  }

  getNumberOfSelectOption() {
    return this.numberOfSelectOptions;
  }

  setHtmlValue(value: string) {
    this.myBehaviorSubject.next(value);
  }

  getHtmlValue() {
    return this.myBehaviorSubject.asObservable();
  }
}
