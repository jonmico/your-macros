import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/navbar';
import styles from './app-layout.module.css';

export default function AppLayout() {
  return (
    <div>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
