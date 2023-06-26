import {IServiceType} from './IServiceType';
import {IBillDetail} from './IBillDetail';

export interface IServices {
  id?: number;
  name: string;
  price: number;
  enableFlag: number;
  imgUrl: string;
  createdDate: string;
  serviceType: IServiceType;
}
