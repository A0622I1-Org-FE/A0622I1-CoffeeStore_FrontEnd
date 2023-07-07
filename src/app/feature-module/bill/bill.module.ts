import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { BillListComponent } from './bill-list/bill-list.component';


@NgModule({
  declarations: [BillListComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class BillModule { }
