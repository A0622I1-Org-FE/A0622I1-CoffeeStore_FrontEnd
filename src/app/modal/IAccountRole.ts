import {IAccount} from './IAccount';
import {IRole} from './IRole';

export interface IAccountRole {
  id?: number;

  account: IAccount;
  role: IRole;
}
