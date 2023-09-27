import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElementsComponent} from "./elements/elements.component";
import {GenerateComponent} from "./generate/generate.component";
import {PreviewComponent} from "./preview/preview.component"; // CLI imports router

const routes: Routes = [
  { path: '', component: ElementsComponent, data: { reuseRoute: true } },
  { path: 'generate-component', component: GenerateComponent },
  { path: 'preview-component', component: PreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
