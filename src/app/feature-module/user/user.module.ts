import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class UserModule { }
