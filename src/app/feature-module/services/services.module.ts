import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BodyComponent} from './body/body.component';
import {ServiceComponent} from './service/service.component';


@NgModule({
  declarations: [BodyComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true}),
    BrowserAnimationsModule,
    BrowserModule
  ]
})
export class ServicesModule { }
