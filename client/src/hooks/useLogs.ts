import { useContext } from 'react';
import { LogContext } from '../contexts/log-context';

export function useLogs() {
  const value = useContext(LogContext);

  if (!value) {
    throw new Error('LogsContext used outside of LogsProvider.');
  }

  return value;
}
