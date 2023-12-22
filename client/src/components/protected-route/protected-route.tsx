import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Spinner from '../spinner/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function ProtectedRoute({
  children,
  isLoading,
}: ProtectedRouteProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!user) navigate('/login');

  return children;
}
