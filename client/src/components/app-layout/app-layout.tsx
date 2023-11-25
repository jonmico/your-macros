import { Outlet } from 'react-router-dom';

import Header from '../header/header';
import styles from './app-layout.module.css';
import Navbar from '../navbar/navbar';

export default function AppLayout() {
  return (
    <div className={'app'}>
      <Header />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
