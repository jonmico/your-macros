import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { fetchActiveSession } from '../../services/user-api';
import { ILoginData } from '../../types/login-data';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { setUser, isAuthenticated, setIsAuthenticated } = useUser();

  useEffect(() => {
    async function fetchSession() {
      const data: ILoginData = await fetchActiveSession();

      if (data.isAuthenticated) {
        setUser({ ...data.user, currentLog: null });
      } else {
        setIsAuthenticated(false);
      }
    }

    fetchSession();
  }, [setUser, isAuthenticated, setIsAuthenticated]);

  return isAuthenticated ? children : <Navigate to={'/login'} replace />;
}
