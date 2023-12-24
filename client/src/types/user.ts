import ILog from './log';

export interface IUser {
  id: string;
  email: string;
  logs: ILog[];
  currentLog: ILog | null;
}
