import { ILog } from './log';

type FetchLogs = {
  type: 'logs/fetch';
  payload: ILog[];
};

export type LogAction = FetchLogs;
