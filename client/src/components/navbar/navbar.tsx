import { NavLink } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { GiMeal } from 'react-icons/gi';
import { IoIosJournal } from 'react-icons/io';
import { FaPencil } from 'react-icons/fa6';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <NavLink to={'/dashboard'} className={styles.navItem}>
            <MdOutlineSpaceDashboard className={styles.icon} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/add-meal'} className={styles.navItem}>
            <GiMeal className={styles.icon} />
            <span>Add Meal</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/logs'} className={styles.navItem}>
            <IoIosJournal className={styles.icon} />
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
