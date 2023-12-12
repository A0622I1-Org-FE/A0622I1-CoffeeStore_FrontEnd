import {IService} from './IService';
import {IBill} from './IBill';

export interface IBillDetail {
  id?: number;
  quantity: number;
  service: IService;
  bill: IBill;
}
