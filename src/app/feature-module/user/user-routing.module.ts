import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InforAccountComponent} from './infor-account/infor-account.component';
import {UserListComponent} from './user-list/user-list.component';


const routes: Routes = [
  {path: 'account-manager', component: UserListComponent},
  {path: 'infor-account/:id', component: InforAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
