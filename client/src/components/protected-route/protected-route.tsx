import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Spinner from '../spinner/spinner';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (isLoading) return;

    if (!user) navigate('/login');
  }, [isLoading, user, navigate]);

  return children;
}
