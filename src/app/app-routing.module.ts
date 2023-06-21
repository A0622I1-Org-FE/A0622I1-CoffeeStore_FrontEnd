import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './feature-module/user/user-list/user-list.component';
import {ServiceComponent} from './feature-module/services/service/service.component';


const routes: Routes = [
  {path: 'feedback', loadChildren: () => import('./feature-module/feedback/feedback.module').then(module => module.FeedbackModule)},
  {path: 'quan-ly-nguoi-dung', component: UserListComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'sales', loadChildren: () => import('./feature-module/sales/sales.module').then(module => module.SalesModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
