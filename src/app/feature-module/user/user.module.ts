import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { UserListComponent } from './user-list/user-list.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ]
})
export class UserModule { }
