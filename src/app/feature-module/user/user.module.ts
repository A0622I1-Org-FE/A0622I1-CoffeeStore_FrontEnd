import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { InforAccountComponent } from './infor-account/infor-account.component';
import {HttpClientModule} from '@angular/common/http';
import {UserListComponent} from './user-list/user-list.component';

@NgModule({
  declarations: [InforAccountComponent, UserListComponent],

  imports: [
    CommonModule,
    UserRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ]
})
export class UserModule { }
