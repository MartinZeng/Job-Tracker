import type { Configuration, PopupRequest } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '8c97609d-163b-416b-8f6d-7b4c4a9f4811',
    authority:
      'https://login.microsoftonline.com/ac8bfc1c-7627-4125-97ac-bed742934302',
    redirectUri: 'http://localhost:5173',
    postLogoutRedirectUri: 'http://localhost:5173',
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
  system: {},
};

export const loginRequest: PopupRequest = {
  scopes: ['User.Read', 'openid', 'profile'],
};
