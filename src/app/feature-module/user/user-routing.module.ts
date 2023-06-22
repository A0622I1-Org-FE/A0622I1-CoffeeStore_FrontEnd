import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InforAccountComponent} from './infor-account/infor-account.component';


const routes: Routes = [
  {path: 'infor-account/:id', component: InforAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
