import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Spinner from '../spinner/spinner';
import styles from './protected-route.module.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading: isFetching, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isFetching) {
      navigate('/login');
    }
  }, [isAuthenticated, isFetching, navigate]);

  if (isFetching) {
    return (
      <div className={styles.fullPage}>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }
}
