import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SalesRoutingModule} from './sales-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import {SalesComponent} from './sales.component';


@NgModule({
  declarations: [
    SalesComponent,
  ],
  exports: [
    SalesComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class SalesModule {
}
