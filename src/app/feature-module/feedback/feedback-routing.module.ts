import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeedbackCreateComponent} from './feedback-create/feedback-create.component';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';


const routes: Routes = [
  {path: 'create', component: FeedbackCreateComponent},
  {path: 'list', component: FeedbackListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
