import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { RazorpayComponent } from '../razorpay/razorpay.component';


@NgModule({
  declarations: [
    CartComponent,
    RazorpayComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
