import {IPosition} from './IPosition';
import {IAccount} from './IAccount';
import {IBill} from './IBill';

export interface IUser {
  id?: number;
  name: string;
  address: string;
  phoneNumber: string;
  birthday: string;
  gender: number;
  salary: number;
  enableFlag: boolean;
  imgUrl: string;

  position: IPosition;
  account?: IAccount;
  bill?: IBill;
}
