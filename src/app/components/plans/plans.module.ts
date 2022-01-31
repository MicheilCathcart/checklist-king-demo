import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakePaymentComponent } from './make-payment/make-payment.component';
import { PlansComponent } from './plans.component';
import { PaymentsRoutingModule } from './plans-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaymentsRoutingModule
  ],
  declarations: [
    MakePaymentComponent,
    PlansComponent
  ]
})
export class PlansModule { }