import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import UserProvider from './contexts/user-context.tsx';
import { LogProvider } from './contexts/log-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <LogProvider>
        <App />
      </LogProvider>
    </UserProvider>
  </React.StrictMode>
);
