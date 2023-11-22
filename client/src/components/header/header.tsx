import styles from './header.module.css';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div>
        <h1>YourMacros</h1>
      </div>
      <div>
        <FaUserCircle className={styles.userIcon} />
      </div>
    </div>
  );
}
