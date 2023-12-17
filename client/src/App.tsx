import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';

import Dashboard from './pages/dashboard/dashboard';
import AddMeal from './pages/add-meal/add-meal';
import Logs from './pages/logs-page/logs';
import CreateFood from './pages/create-food/create-food';
import GlobalStyles from './styles/global-styles';
import Home from './pages/home/home';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/add-meal'} element={<AddMeal />} />
            <Route path={'/logs'} element={<Logs />} />
            <Route path={'/create-food'} element={<CreateFood />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
