import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InforAccountComponent} from './infor-account/infor-account.component';
import {AuthGuard} from '../../service/auth.guard';

const routes: Routes = [
  {
    path: 'infor-account', component: InforAccountComponent, canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'user']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
