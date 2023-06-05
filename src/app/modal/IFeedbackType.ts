import {IFeedback} from './IFeedback';

export interface IFeedbackType {
  id?: number;
  type: string;

  feedbackList: IFeedback[];
}
