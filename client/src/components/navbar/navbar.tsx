import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to={'/dashboard'}>Dashboard</Link>
        </li>
        <li className={styles.navItem}>
          <Link to={'/add-meal'}>Add Meal</Link>
        </li>
        <li className={styles.navItem}>
          <Link to={'/logs'}>Logs</Link>
        </li>
        <li className={styles.navItem}>
          <Link to={'create-food'}>Create Food</Link>
        </li>
      </ul>
    </nav>
  );
}
