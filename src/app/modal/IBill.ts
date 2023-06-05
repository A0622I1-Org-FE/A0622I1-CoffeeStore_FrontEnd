import {ITable} from './ITable';
import {IUser} from './User';
import {IBillDetail} from './IBillDetail';

export interface IBill {
  id?: number;
  createdTime: string;
  paymentStatus: boolean;
  paymentTime: string;
  table: ITable;
  user: IUser;
  billDetailList: IBillDetail[];
}
