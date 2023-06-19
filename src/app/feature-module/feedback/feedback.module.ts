import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [FeedbackListComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule
  ]
})
export class FeedbackModule { }
