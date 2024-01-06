import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';

import styles from './App.module.css';
import Header from './components/header/header';
import ProtectedRoute from './components/protected-route/protected-route';
import { useSession } from './hooks/useSession';
import AddMeal from './pages/add-meal/add-meal';
import CreateFood from './pages/create-food/create-food';
import Dashboard from './pages/dashboard/dashboard';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Logs from './pages/logs-page/logs';
import Register from './pages/register/register';
import SingleLog from './pages/single-log/single-log';
import GlobalStyles from './styles/global-styles';
import CreateFoodForm from './components/create-food-form/create-food-form';
import YourFoodForm from './components/your-food-form/your-food-form';

// TODO: Add YourFoods (custom foods that are comprised of foods in the database).
// TODO: Let users browse the database without logging in or signing up.
function App() {
  useSession();

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <div className={styles.appContainer}>
          <Header />
          <Routes>
            <Route path={'/'} index element={<Home />} />
            <Route path={'login'} element={<Login />} />
            <Route path={'register'} element={<Register />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path={'dashboard'} element={<Dashboard />} />
              <Route path={'add-meal'} element={<AddMeal />} />
              <Route path={'logs'} element={<Logs />} />
              <Route path={'logs/:logId'} element={<SingleLog />} />
              <Route path={'create-food'} element={<CreateFood />}>
                <Route
                  index
                  element={<Navigate replace to={'create-food-form'} />}
                />
                <Route path={'create-food-form'} element={<CreateFoodForm />} />
                <Route path={'your-food-form'} element={<YourFoodForm />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
