import {IServiceType} from './IServiceType';

export interface IServices {
  id?: number;
  name: string;
  price: number;
  enableFlag: number;
  imgUrl: string;
  createdDate: string;
  serviceType: IServiceType;
}
