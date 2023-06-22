import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BillModule} from './feature-module/bill/bill.module';
import {SecurityModule} from './feature-module/security/security.module';
import {ServicesModule} from './feature-module/services/services.module';
import {TableModule} from './feature-module/table/table.module';
import {UserModule} from './feature-module/user/user.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment.prod';
import {AngularFireModule} from '@angular/fire';
import {SalesModule} from './feature-module/sales/sales.module';
import {FeedbackModule} from './feature-module/feedback/feedback.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BillModule,
    FeedbackModule,
    SecurityModule,
    ServicesModule,
    TableModule,
    UserModule,
    SalesModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
