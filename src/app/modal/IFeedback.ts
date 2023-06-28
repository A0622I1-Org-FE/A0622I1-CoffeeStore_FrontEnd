/**
 * IFeedback interface is used to collect data from the API
 *
 * @author TuLG
 * @version 1.0
 * @since 2023-06-13
 */

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
