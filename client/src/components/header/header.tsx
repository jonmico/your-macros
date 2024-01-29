import { Link, NavLink, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

import styles from './header.module.css';

export default function Header() {
  const { userState, logout } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    const isLoggedOut = await logout();
    if (isLoggedOut) navigate('/');
  }
  return (
    <div className={styles.headerContainer}>
      <div>
        <Link to={'/'} className={styles.link}>
          <h1>YourMacros</h1>
        </Link>
      </div>
      <nav className={styles.headerNav}>
        <NavLink to={'/search-foods'}>Search Foods</NavLink>
        {!userState.isAuthenticated ? (
          <>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/register'}>Sign Up</NavLink>
          </>
        ) : (
          <>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
