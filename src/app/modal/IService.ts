import {IServiceType} from './IServiceType';

export interface IService {
  id?: number;
  name: string;
  price: number;
  enableFlag: boolean;
  imgUrl: string;
  createdDate: string;
  serviceType: IServiceType;
  describe: string;
}
