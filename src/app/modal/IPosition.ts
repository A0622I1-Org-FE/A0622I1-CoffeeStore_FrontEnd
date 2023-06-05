import {IUser} from './User';

export interface IPosition {
  id?: number;
  name: string;

  userList: IUser[];
}
