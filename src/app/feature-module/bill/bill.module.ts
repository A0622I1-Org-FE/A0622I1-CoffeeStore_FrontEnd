import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BillRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class BillModule { }
