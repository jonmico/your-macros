import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Spinner from '../spinner/spinner';
import styles from './protected-route.module.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userState } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.isAuthenticated && !userState.isLoading) {
      navigate('/login');
    }
  }, [userState.isAuthenticated, userState.isLoading, navigate]);

  if (userState.isLoading) {
    return (
      <div className={styles.fullPage}>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (userState.user) {
    return children;
  }
}
