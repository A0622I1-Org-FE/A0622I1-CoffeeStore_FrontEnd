import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {FeedbackCreateComponent} from './feedback-create/feedback-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [FeedbackListComponent, FeedbackCreateComponent],
    imports: [
        CommonModule,
        FeedbackRoutingModule,
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class FeedbackModule { }
