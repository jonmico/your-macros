import ILog from './log';

export interface IUser {
  _id: string;
  email: string;
  logs: ILog[];
  currentLog: ILog | null;
}
