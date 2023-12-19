import { Link } from 'react-router-dom';
import styles from './home.module.css';
import LoginButton from '../../components/login-button/login-button';

export default function Home() {
  return (
    <div>
      <h2>WELCOME TO THE HOME PAGE ENJOY YOUR STAY</h2>
      <Link to={'/dashboard'} className={styles.link}>
        Dashboard
      </Link>
      <LoginButton />
    </div>
  );
}
