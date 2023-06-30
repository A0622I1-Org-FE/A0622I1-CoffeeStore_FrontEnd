import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BillModule} from './feature-module/bill/bill.module';
import {FeedbackModule} from './feature-module/feedback/feedback.module';
import {ServicesModule} from './feature-module/services/services.module';
import {TableModule} from './feature-module/table/table.module';
import {UserModule} from './feature-module/user/user.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import {SalesModule} from './feature-module/sales/sales.module';
import {SharedModuleModule} from './shared-module/shared-module.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ServiceComponent} from './feature-module/services/service/service.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {TableComponent} from './feature-module/table/table.component';
import {AuthInterceptor} from './service/auth.interceptor';
import {SecurityModule} from './feature-module/security/security.module';


// @ts-ignore
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
    HttpClientModule,
    BillModule,
    HttpClientModule,
    FeedbackModule,
    ServicesModule,
    SecurityModule,
    TableModule,
    UserModule,
    SalesModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
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
