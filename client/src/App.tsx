import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';

import Dashboard from './pages/dashboard/dashboard';
import AddMeal from './pages/add-meal/add-meal';
import Logs from './pages/logs-page/logs';
import CreateFood from './pages/create-food/create-food';
import GlobalStyles from './styles/global-styles';
import Home from './pages/home/home';
import styles from './App.module.css';
import Header from './components/header/header';
import Login from './pages/login/login';
import Register from './pages/register/register';
import ProtectedRoute from './components/protected-route/protected-route';

function App() {
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
              <Route path={'/create-food'} element={<CreateFood />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
