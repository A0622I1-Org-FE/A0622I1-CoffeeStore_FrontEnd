import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SecurityRoutingModule} from './security-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {VerifyChangePasswordComponent} from './verify-change-password/verify-change-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [LoginComponent, VerifyChangePasswordComponent, ChangePasswordComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class SecurityModule {
}
