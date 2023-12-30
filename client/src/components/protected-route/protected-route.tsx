import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? children : <Navigate to={'/login'} replace />;
}
