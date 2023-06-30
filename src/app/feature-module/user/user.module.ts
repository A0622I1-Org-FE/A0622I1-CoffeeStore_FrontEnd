import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { UserCreateComponent } from './user-create/user-create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './user-edit/user-edit.component';



@NgModule({
  declarations: [UserCreateComponent, UserEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class UserModule { }
