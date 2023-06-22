import {IFeedbackType} from './IFeedbackType';
import {IFeedbackImg} from './IFeedbackImg';
import {IBill} from './IBill';

export interface IFeedback {
  id?: number;
  feedbackId: string;
  name: string;
  email: string;
  date: string;
  content: string;
  rate: number;
  type: IFeedbackType;
  img?: IFeedbackImg[];
  bill: IBill;

}
