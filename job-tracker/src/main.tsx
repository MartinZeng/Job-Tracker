import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './auth/auth0Config';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider {...auth0Config}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
