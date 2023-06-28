import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {ServiceComponent} from './service/service.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ServiceComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class ServicesModule { }
