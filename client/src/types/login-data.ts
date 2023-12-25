import { IUser } from './user';

export interface ILoginData {
  isAuthenticated: boolean;
  user: IUser;
}
