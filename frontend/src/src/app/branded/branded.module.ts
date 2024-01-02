import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrandedRoutingModule } from './branded-routing.module';
import { BrandedComponent } from './branded.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BrandedComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    BrandedRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class BrandedModule { }
