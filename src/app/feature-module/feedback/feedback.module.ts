import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeedbackRoutingModule} from './feedback-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {FeedbackCreateComponent} from './feedback-create/feedback-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';


@NgModule({
  declarations: [FeedbackCreateComponent, FeedbackListComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class FeedbackModule {
}
