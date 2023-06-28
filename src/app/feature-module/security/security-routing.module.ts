import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyChangePasswordComponent} from './verify-change-password/verify-change-password.component';
import {AuthGuard} from '../../service/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-change-password/:code', component: VerifyChangePasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent , canActivate: [AuthGuard],
  data: {
    roles: ['admin', 'user']
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
