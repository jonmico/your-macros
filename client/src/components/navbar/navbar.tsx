import { NavLink } from 'react-router-dom';
import { FaHouseChimney } from 'react-icons/fa6';
import { FaUtensils } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa6';
import { FaPencil } from 'react-icons/fa6';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <NavLink to={'/dashboard'} className={styles.navItem}>
            <FaHouseChimney className={styles.icon} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/add-meal'} className={styles.navItem}>
            <FaUtensils className={styles.icon} />
            <span>Add Meal</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/logs'} className={styles.navItem}>
            <FaBook className={styles.icon} />
            <span>Logs</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'create-food'} className={styles.navItem}>
            <FaPencil className={styles.icon} />
            <span>Create Food</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
