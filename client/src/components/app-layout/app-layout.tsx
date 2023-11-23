import { Outlet } from 'react-router-dom';

import Header from '../header/header';
import styles from './app-layout.module.css';

export default function AppLayout() {
  return (
    <div className={'app'}>
      <Header />
      <Outlet />
    </div>
  );
}
