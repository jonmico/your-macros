import { ILog } from './log';
import { IMacros } from './macros';

export interface IUser {
  _id: string;
  email: string;
  logs: ILog[];
  calories: number;
  macros: IMacros;
  activeLog: string | null | undefined;
}
