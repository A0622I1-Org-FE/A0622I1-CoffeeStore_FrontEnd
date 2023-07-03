import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BillModule} from './feature-module/bill/bill.module';
import {FeedbackModule} from './feature-module/feedback/feedback.module';
import {SecurityModule} from './feature-module/security/security.module';
import {ServicesModule} from './feature-module/services/services.module';
import {TableModule} from './feature-module/table/table.module';
import {UserModule} from './feature-module/user/user.module';
import {SharedModuleModule} from './shared-module/shared-module.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ServiceComponent } from './feature-module/services/service/service.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {TableComponent} from './feature-module/table/table.component';
import {AuthInterceptor} from './service/auth.interceptor';
import {SalesModule} from './feature-module/sales/sales.module';


@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BillModule,
    HttpClientModule,
    FeedbackModule,
    SecurityModule,
    ServicesModule,
    TableModule,
    UserModule,
    SalesModule,
    BrowserAnimationsModule,
    SharedModuleModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
