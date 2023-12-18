import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div>
        <Link to={'/'} className={styles.link}>
          <h1>YourMacros</h1>
        </Link>
      </div>
      <div onClick={() => console.log('hi')}>
        <FaUserCircle className={styles.userIcon} />
      </div>
    </div>
  );
}
