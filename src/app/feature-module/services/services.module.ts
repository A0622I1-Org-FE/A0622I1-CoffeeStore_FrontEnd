import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class ServicesModule { }
