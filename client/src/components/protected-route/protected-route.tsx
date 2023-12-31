import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading: isFetching } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isFetching) {
      navigate('/login');
    }
  }, [isAuthenticated, isFetching, navigate]);

  if (isFetching) {
    return <p>WE ARE LOADING</p>;
  }

  return children;

  // return isAuthenticated ? children : <Navigate to={'/login'} replace />;
}
