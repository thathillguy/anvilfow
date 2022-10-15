import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitLibraryComponent } from './component/unit-library/unit-library.component';

const routes: Routes = [
  { path: 'unitlibrary', component: UnitLibraryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }