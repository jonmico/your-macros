import { Outlet } from 'react-router-dom';

import Header from '../header/header';
import styles from './app-layout.module.css';
import Navbar from '../navbar/navbar';
import { StyledAppLayout } from './app-layout.styled';

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </StyledAppLayout>
  );
}
