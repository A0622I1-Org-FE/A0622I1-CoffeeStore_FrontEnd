import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        SecurityRoutingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
    ]
})
export class SecurityModule { }
