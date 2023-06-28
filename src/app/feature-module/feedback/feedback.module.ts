import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {FeedbackCreateComponent} from './feedback-create/feedback-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [FeedbackListComponent, FeedbackCreateComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class FeedbackModule { }
