import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElementsComponent} from "./elements/elements.component";
import {GenerateComponent} from "./generate/generate.component";
import {PreviewComponent} from "./preview/preview.component"; // CLI imports router

const routes: Routes = [
  { path: '', redirectTo: 'elements-component', pathMatch: 'full'},
  { path: 'elements-component', component: ElementsComponent },
  { path: 'generate-component', component: GenerateComponent },
  { path: 'preview-component', component: PreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
