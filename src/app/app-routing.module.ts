import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BillListComponent} from './feature-module/bill/bill-list/bill-list.component';
import {FeedbackListComponent} from './feature-module/feedback/feedback-list/feedback-list.component';
import {UserListComponent} from './feature-module/user/user-list/user-list.component';
import {ServiceComponent} from './feature-module/services/service/service.component';
import {InforAccountComponent} from './feature-module/user/infor-account/infor-account.component';
import {FeedbackCreateComponent} from './feature-module/feedback/feedback-create/feedback-create.component';
import {AuthGuard} from './service/auth.guard';
import {BodyComponent} from './feature-module/services/body/body.component';
import {TableComponent} from './feature-module/table/table.component';
import {LoginComponent} from './feature-module/security/login/login.component';
import {SalesComponent} from './feature-module/sales/sales.component';
import {ListComponent} from './feature-module/services/list/list.component';
import {CreateComponent} from './feature-module/services/create/create.component';


const routes: Routes = [
  {path: 'service/:id', component: ServiceComponent , canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'user']
    }},
  {path: 'change-pass', component: InforAccountComponent},
  {path: 'order', component: BillListComponent, canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'user']
    }},
  {path: 'feedback/create', component: FeedbackCreateComponent},
  // {path: 'sales', loadChildren: () => import('./feature-module/sales/sales.module').then(module => module.SalesModule)},
  {path: 'login', component: LoginComponent},
  {path: 'change-pass', component: InforAccountComponent},
  {path: 'sales', component: SalesComponent},
  { path: 'feedbackList', component: FeedbackListComponent},
  { path: 'userList', component: UserListComponent , canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'user']
    }},
  { path: '', component: BodyComponent},
  { path: 'table', component: TableComponent, canActivate: [AuthGuard],
  data: {
  roles: ['admin', 'user']
}},
  { path: 'listMenu', component: ListComponent, canActivate: [AuthGuard],
  data: {
  roles: ['admin']
}},
  { path: 'createService', component: CreateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
