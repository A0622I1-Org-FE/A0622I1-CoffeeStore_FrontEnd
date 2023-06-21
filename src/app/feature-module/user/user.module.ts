import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { InforAccountComponent } from './infor-account/infor-account.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [InforAccountComponent],

  imports: [
    CommonModule,
    UserRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ]
})
export class UserModule { }
