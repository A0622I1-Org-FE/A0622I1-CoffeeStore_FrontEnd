import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { InforAccountComponent } from './infor-account/infor-account.component';


@NgModule({
  declarations: [InforAccountComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class UserModule { }
