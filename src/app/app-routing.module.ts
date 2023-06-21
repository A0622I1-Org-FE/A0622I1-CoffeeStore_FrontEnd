import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeedbackCreateComponent} from './feature-module/feedback/feedback/feedback-create/feedback-create.component';


const routes: Routes = [
  {path: 'feedback', component: FeedbackCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
