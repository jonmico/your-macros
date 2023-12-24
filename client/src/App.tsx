import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';

import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Header from './components/header/header';
import ProtectedRoute from './components/protected-route/protected-route';
import useUser from './hooks/useUser';
import AddMeal from './pages/add-meal/add-meal';
import CreateFood from './pages/create-food/create-food';
import Dashboard from './pages/dashboard/dashboard';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Logs from './pages/logs-page/logs';
import Register from './pages/register/register';
import { fetchActiveSession } from './services/user-api';
import GlobalStyles from './styles/global-styles';
import { ILoginData } from './types/login-data';

function App() {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      setIsLoading(true);
      const data: ILoginData = await fetchActiveSession();
      setIsLoading(false);

      if (data.isAuthenticated) {
        setUser({ ...data.user, id: data.user._id, currentLog: null });
      }
    }
    fetchSession();
  }, [setUser]);

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
                <ProtectedRoute isLoading={isLoading}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path={'/dashboard'} element={<Dashboard />} />
              <Route path={'/add-meal'} element={<AddMeal />} />
              <Route path={'/logs'} element={<Logs />} />
              <Route path={'/create-food'} element={<CreateFood />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
