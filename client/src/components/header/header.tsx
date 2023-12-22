import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import useUser from '../../hooks/useUser';
import { logout } from '../../services/user-api';

interface IDataLogout {
  successfulLogout: boolean;
}

export default function Header() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    const data: IDataLogout = await logout();

    if (data.successfulLogout) {
      setUser(null);
      navigate('/');
    }
  }
  return (
    <div className={styles.headerContainer}>
      <div>
        <Link to={'/'} className={styles.link}>
          <h1>YourMacros</h1>
        </Link>
      </div>
      <nav className={styles.headerNav}>
        {!user ? (
          <>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/register'}>Sign Up</NavLink>
          </>
        ) : (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </div>
  );
}
