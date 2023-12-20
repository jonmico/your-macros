import { Link, NavLink } from 'react-router-dom';
import styles from './header.module.css';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div>
        <Link to={'/'} className={styles.link}>
          <h1>YourMacros</h1>
        </Link>
      </div>
      <nav className={styles.headerNav}>
        <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/register'}>Sign Up</NavLink>
      </nav>
    </div>
  );
}
