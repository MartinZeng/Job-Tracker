export const auth0Config = {
  domain: 'your-auth0-domain.us.auth0.com',
  clientId: 'your-auth0-client-id',
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_REDIRECT_URI ?? 'http://localhost:5173',
    audience: 'https://job-tracker-production-9dd2.up.railway.app',
  },
};
