export const auth0Config = {
  domain: 'dev-mit2etswijszi7lv.us.auth0.com',
  clientId: 'Q9sFq4eZP69FSpksBJdOX4xExcKOmDuF',
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_REDIRECT_URI ?? 'http://localhost:5173',
    audience: 'https://job-tracker-production-9dd2.up.railway.app',
  },
  cacheLocation: 'localstorage' as const,
  useRefreshTokens: true,
};
