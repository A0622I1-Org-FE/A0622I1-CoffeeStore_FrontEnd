import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyChangePasswordComponent} from './verify-change-password/verify-change-password.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-change-password/:code', component: VerifyChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
