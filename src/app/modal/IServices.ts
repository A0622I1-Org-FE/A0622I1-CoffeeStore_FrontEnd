import {IServiceType} from './IServiceType';
import {IBillDetail} from './IBillDetail';

export interface IServices {
  id?: number;
  name: string;
  price: number;
  enableFlag: boolean;
  imgUrl: string;
  createDate: string;
  type: IServiceType;
  billDetailList: IBillDetail[];
}
