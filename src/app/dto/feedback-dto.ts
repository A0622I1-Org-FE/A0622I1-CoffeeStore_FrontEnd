import {Validators} from '@angular/forms';

export interface FeedbackDto {
  name: string;
  email: string;
  feedbackType: string;
  content: string;
  rate: string;
}
