import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx';

const URL = import.meta.env.PROD
  ? 'https://your-macros.onrender.com/dashboard'
  : 'http://localhost:5173/dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-7cuxnms4wtiwlbc1.us.auth0.com'
      clientId='Cgo8TREtu6HvTiZ8cN8SWcwXWZEvJdQP'
      authorizationParams={{
        redirect_uri: URL,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
