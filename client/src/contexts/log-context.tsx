import { createContext, useEffect, useReducer } from 'react';
import { ILog } from '../types/log';
import { apiGetLogs } from '../services/logs-api';
import { LogState, logReducer } from '../reducers/logReducer';

interface ILogContext {
  logState: {
    logs: ILog[];
    isLoading: boolean;
  };
}

const initialState: LogState = {
  logs: [],
  isLoading: false,
};

export const LogContext = createContext<ILogContext | null>(null);

interface LogProviderProps {
  children: React.ReactNode;
  userId: string;
}

// TODO: Move the rest of the functionality pertaining to logs over to this context.

export function LogProvider(props: LogProviderProps) {
  const [logState, dispatch] = useReducer(logReducer, initialState);

  useEffect(() => {
    async function fetchUserLogs() {
      dispatch({ type: 'logs/loading' });
      const data: { logs: ILog[] } = await apiGetLogs(props.userId);
      dispatch({ type: 'logs/fetch', payload: data.logs });
    }
    fetchUserLogs();
  }, [props.userId]);

  const value = { logState };

  return (
    <LogContext.Provider value={value}>{props.children}</LogContext.Provider>
  );
}
