import ILog from './log';

export default interface IUser {
  email: string;
  password: string;
  logs: ILog[];
}
