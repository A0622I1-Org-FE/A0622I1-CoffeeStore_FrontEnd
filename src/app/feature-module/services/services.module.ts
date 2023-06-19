import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { ForgotPasswordComponent } from '../security/forgot-password/forgot-password.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class ServicesModule { }
