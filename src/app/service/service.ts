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
  private index = new BehaviorSubject<number>(0);
  private position = new BehaviorSubject<number>(0);
  private dialogState = new BehaviorSubject<boolean>(false);


  currentData = this.dataToPass.asObservable();
  currentHtmlCode = this.htmlCodeToPreview.asObservable();
  currentNumberOfSelectOptions = this.numberOfSelectOptions.asObservable();
  currentIndex = this.index.asObservable();
  currentPosition = this.position.asObservable();
  currentDialogState = this.dialogState.asObservable();

  changeCurrentData(m: Map<string, ComponentRef<any>>) {
    this.dataToPass.next(m)
  }

  changeDialogState(ds: boolean) {
    this.dialogState.next(ds);
  }

  changeIndex(n: number){
    this.index.next(n);
  }

  changePosition(n: number){
    this.position.next(n);
  }

  setHtmlValue(value: string) {
    this.myBehaviorSubject.next(value);
  }

  getHtmlValue() {
    return this.myBehaviorSubject.asObservable();
  }
}
