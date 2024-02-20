import { createContext, useEffect, useReducer } from 'react';
import { ILog } from '../types/log';
import { apiGetLogs } from '../services/logs-api';
import { LogState, logReducer } from '../reducers/logReducer';

interface ILogContext {
  logState: {
    logs: ILog[];
    isLoading: boolean;
  };
  fetchLogs: (id: string) => Promise<void>;
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

  async function fetchLogs(id: string) {
    dispatch({ type: 'logs/loading' });
    const data: { logs: ILog[] } = await apiGetLogs(id);
    console.log(data);
    dispatch({ type: 'logs/fetch', payload: data.logs });
  }

  const value = { logState, fetchLogs };

  return (
    <LogContext.Provider value={value}>{props.children}</LogContext.Provider>
  );
}
