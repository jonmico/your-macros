import './index.css';
import Header from './components/header/header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/app-layout/app-layout';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className={'app'}>
      <Header />
      <Navbar />
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<AppLayout />}>
    //       <Route path={'user'}></Route>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
