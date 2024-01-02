import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandedComponent } from './branded.component';

const routes: Routes = [{ path: '', component: BrandedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandedRoutingModule { }
