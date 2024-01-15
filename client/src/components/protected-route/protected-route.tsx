import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Spinner from '../spinner/spinner';
import styles from './protected-route.module.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      navigate('/login');
    }
  }, [state.isAuthenticated, state.isLoading, navigate]);

  if (state.isLoading) {
    return (
      <div className={styles.fullPage}>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (state.user) {
    return children;
  }
}
