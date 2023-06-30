import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'feedback', loadChildren: () => import('./feature-module/feedback/feedback.module').then(module => module.FeedbackModule)},
  {path: '', loadChildren: () => import('./feature-module/user/user.module').then(module => module.UserModule)},
  {path: 'sales', loadChildren: () => import('./feature-module/sales/sales.module').then(module => module.SalesModule)},
  {path: '', loadChildren: () => import('./feature-module/services/services.module').then(module => module.ServicesModule)},
  {path: 'order', loadChildren: () => import('./feature-module/bill/bill.module').then(module => module.BillModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
