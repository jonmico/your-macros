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
import SingleLog from './pages/single-log/single-log';
import GlobalStyles from './styles/global-styles';
import SearchFoods from './pages/search-foods/search-foods';

// TODO: Add some type of feedback to the user (maybe a toast?) when they create a food.
// TODO: Maybe make a food page where people can look at food info/data without being logged in.

export default function App() {
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
            <Route path={'search-foods'} element={<SearchFoods />} />
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
              <Route path={'create-food'} element={<CreateFood />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
