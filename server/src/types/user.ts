import ILog from './log';

export default interface IUser {
  email: string;
  logs: ILog[];
}
