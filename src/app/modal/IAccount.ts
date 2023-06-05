import {IUser} from './User';
import {IAccountRole} from './IAccountRole';

export interface IAccount {
  id?: number;
  userName: string;
  password: string;
  verificationCode: string;
  email: string;
  enableFlag: boolean;

  user: IUser;
  accountRoleList: IAccountRole[];

}
