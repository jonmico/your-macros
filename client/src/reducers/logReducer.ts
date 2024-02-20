import { ILog } from '../types/log';
import { LogAction } from '../types/logTypes';

export interface LogState {
  logs: ILog[];
  isLoading: boolean;
}

export function logReducer(state: LogState, action: LogAction) {
  switch (action.type) {
    case 'logs/fetch':
      return {
        ...state,
        logs: action.payload,
      };
    default:
      throw TypeError('Action type unknown.');
  }
}
