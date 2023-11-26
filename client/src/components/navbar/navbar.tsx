import { FaHouseChimney } from 'react-icons/fa6';
import { FaUtensils } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa6';
import { FaPencil } from 'react-icons/fa6';
import { StyledNavLink, StyledList, StyledNav } from './navbar.styled';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <StyledNav>
      <StyledList>
        <li>
          <StyledNavLink to={'/dashboard'} className={styles.navItem}>
            <FaHouseChimney className={styles.icon} />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={'/add-meal'} className={styles.navItem}>
            <FaUtensils className={styles.icon} />
            <span>Add Meal</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={'/logs'} className={styles.navItem}>
            <FaBook className={styles.icon} />
            <span>Logs</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={'create-food'} className={styles.navItem}>
            <FaPencil className={styles.icon} />
            <span>Create Food</span>
          </StyledNavLink>
        </li>
      </StyledList>
    </StyledNav>
  );
}
