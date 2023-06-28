import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServiceComponent} from './service/service.component';
import {InforAccountComponent} from '../user/infor-account/infor-account.component';


const routes: Routes = [
  {path: 'service', component: ServiceComponent},
  {path: 'change-pass', component: InforAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
