import {IBill} from './IBill';

export interface ITable {
  id?: number;
  name: string;
  status: string;
  enableFlag: boolean;
  bill: IBill;
}
