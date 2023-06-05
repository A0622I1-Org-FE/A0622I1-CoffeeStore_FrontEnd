import {IServices} from './IServices';
import {IBill} from './IBill';

export interface IBillDetail {
  id?: number;
  quantity: number;

  service: IServices;
  bill: IBill;

}
