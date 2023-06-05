import {IServices} from './IServices';

export interface IServiceType {
  id?: number;
  name: string;
  service: IServices[];
}
