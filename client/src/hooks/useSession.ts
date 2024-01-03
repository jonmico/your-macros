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
  } = useUser();

  useEffect(() => {
    async function fetchSession() {
      setIsFetching(true);
      const data: ILoginData = await fetchActiveSession();
      setIsFetching(false);

      if (data.isAuthenticated) {
        setUser({ ...data.user });
        setLogs(data.user.logs);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    fetchSession();
  }, [setUser, setLogs, isAuthenticated, setIsAuthenticated, setIsFetching]);
}
