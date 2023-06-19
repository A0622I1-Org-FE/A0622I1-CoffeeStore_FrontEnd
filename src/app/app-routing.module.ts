import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeedbackListComponent} from './feature-module/feedback/feedback-list/feedback-list.component';
import {UserListComponent} from './feature-module/user/user-list/user-list.component';


const routes: Routes = [
  { path: 'quan-ly-phan-hoi', component: FeedbackListComponent},
  { path: 'quan-ly-nguoi-dung', component: UserListComponent},
  { path: 'sales', loadChildren: () => import('./feature-module/sales/sales.module').then(module => module.SalesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
