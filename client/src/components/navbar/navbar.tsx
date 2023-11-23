import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>Dashboard</li>
        <li>Add Meal</li>
        <li>Logs</li>
        <li>Create Food</li>
      </ul>
    </nav>
  );
}
