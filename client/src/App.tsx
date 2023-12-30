import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';

import styles from './App.module.css';
import Header from './components/header/header';
import ProtectedRoute from './components/protected-route/protected-route';
import AddMeal from './pages/add-meal/add-meal';
import CreateFood from './pages/create-food/create-food';
import Dashboard from './pages/dashboard/dashboard';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Logs from './pages/logs-page/logs';
import Register from './pages/register/register';
import GlobalStyles from './styles/global-styles';
import SingleLog from './pages/single-log/single-log';
import { useEffect } from 'react';
import { ILoginData } from './types/login-data';
import useUser from './hooks/useUser';
import { fetchActiveSession } from './services/user-api';

function App() {
  const { setUser, isAuthenticated, setIsAuthenticated } = useUser();

  useEffect(() => {
    async function fetchSession() {
      const data: ILoginData = await fetchActiveSession();

      if (data.isAuthenticated) {
        setUser({ ...data.user });
      } else {
        setIsAuthenticated(false);
      }
    }

    fetchSession();
  }, [setUser, isAuthenticated, setIsAuthenticated]);
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <div className={styles.appContainer}>
          <Header />
          <Routes>
            <Route path={'/'} index element={<Home />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path={'/dashboard'} element={<Dashboard />} />
              <Route path={'/add-meal'} element={<AddMeal />} />
              <Route path={'/logs'} element={<Logs />} />
              <Route path={'/logs/:logId'} element={<SingleLog />} />
              <Route path={'/create-food'} element={<CreateFood />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
