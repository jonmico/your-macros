import { useEffect } from 'react';
import useUser from './useUser';
import { ILoginData } from '../types/login-data';
import { fetchActiveSession } from '../services/user-api';

export function useSession() {
  const {
    setUser,
    setLogs,
    isAuthenticated,
    setIsAuthenticated,
    setIsLoading: setIsFetching,
    setSelectedLog,
  } = useUser();

  useEffect(() => {
    async function fetchSession() {
      setIsFetching(true);
      const data: ILoginData = await fetchActiveSession();
      setIsFetching(false);

      if (data.isAuthenticated) {
        setUser({ ...data.user });
        setLogs(data.user.logs);
        setSelectedLog(data.user.logs[data.user.logs.length - 1]);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    fetchSession();
  }, [
    setUser,
    setLogs,
    isAuthenticated,
    setIsAuthenticated,
    setIsFetching,
    setSelectedLog,
  ]);
}
