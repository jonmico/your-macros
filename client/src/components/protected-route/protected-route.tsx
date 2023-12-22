import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

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

  // TODO: Login screen is flashing. Strictmode issue? When cookies work on deployment, revisit this.
  useEffect(() => {
    if (isLoading) return;

    if (!user) navigate('/login');
  }, [isLoading, user, navigate]);

  return children;
}
