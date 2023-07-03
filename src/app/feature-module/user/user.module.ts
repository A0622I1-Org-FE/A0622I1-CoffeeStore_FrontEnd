import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { InforAccountComponent } from './infor-account/infor-account.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [InforAccountComponent, UserListComponent, UserCreateComponent, UserEditComponent],

  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ]
})
export class UserModule { }
