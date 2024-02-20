import { createContext, useReducer } from 'react';
import { ILog } from '../types/log';

import { LogState, logReducer } from '../reducers/logReducer';

interface ILogContext {
  logState: {
    logs: ILog[];
    isLoading: boolean;
  };
  fetchLogs: (id: string) => void;
}

const initialState: LogState = {
  logs: [],
  isLoading: false,
};

export const LogContext = createContext<ILogContext | null>(null);

interface LogProviderProps {
  children: React.ReactNode;
}

export function LogProvider(props: LogProviderProps) {
  const [logState, dispatch] = useReducer(logReducer, initialState);

  const fetchLogs = (id: string) => {
    console.log(id);
  };

  const value = { logState, fetchLogs };

  return (
    <LogContext.Provider value={value}>{props.children}</LogContext.Provider>
  );
}
