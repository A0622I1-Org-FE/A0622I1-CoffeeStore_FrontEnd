import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { VerifyChangePasswordComponent } from './verify-change-password/verify-change-password.component';


@NgModule({
  declarations: [LoginComponent, VerifyChangePasswordComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class SecurityModule { }
