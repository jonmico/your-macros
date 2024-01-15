import { useEffect } from 'react';
import useUser from './useUser';
import { ILoginData } from '../types/login-data';
import { fetchActiveSession } from '../services/user-api';

export function useSession() {
  const { fetchActiveSession } = useUser();

  useEffect(() => {
    async function fetchSession() {
      await fetchActiveSession();
    }

    fetchSession();
  }, [fetchActiveSession]);
}
