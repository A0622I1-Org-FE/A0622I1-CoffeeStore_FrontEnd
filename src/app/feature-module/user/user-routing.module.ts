import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import {InforAccountComponent} from './infor-account/infor-account.component';
import {AuthGuard} from '../../service/auth.guard';


const routes: Routes = [
  { path: 'create-user', component: UserCreateComponent },
  { path: 'edit-user/:id', component: UserEditComponent },

{
  path: 'infor-account', component: InforAccountComponent, canActivate: [AuthGuard],
  data: {
    roles: ['admin', 'user']
  }
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class UserRoutingModule {
}
