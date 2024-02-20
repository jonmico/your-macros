import { ILog } from './log';

type FetchLogs = {
  type: 'logs/fetch';
  payload: ILog[];
};

type Loading = {
  type: 'logs/loading';
};

export type LogAction = FetchLogs | Loading;
