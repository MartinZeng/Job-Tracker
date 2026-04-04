import type { Configuration, PopupRequest } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '8c97609d-163b-416b-8f6d-7b4c4a9f4811',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: import.meta.env.VITE_REDIRECT_URI ?? 'http://localhost:5173',
    postLogoutRedirectUri:
      import.meta.env.VITE_REDIRECT_URI ?? 'http://localhost:5173',
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
};

export const loginRequest: PopupRequest = {
  scopes: ['User.Read', 'openid', 'profile'],
};

console.log('Redirect URI:', import.meta.env.VITE_REDIRECT_URI);
