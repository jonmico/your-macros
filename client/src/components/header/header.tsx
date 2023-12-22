import { Link, NavLink } from 'react-router-dom';
import styles from './header.module.css';
import useUser from '../../hooks/useUser';

export default function Header() {
  const { user } = useUser();
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
          <button className={styles.logoutButton}>Logout</button>
        )}
      </nav>
    </div>
  );
}
