import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { TableComponent } from './table.component';


@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class TableModule { }
