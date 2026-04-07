export const auth0Config = {
  domain:
    import.meta.env.VITE_AUTH0_DOMAIN ?? 'dev-mit2etswijszi7lv.us.auth0.com',
  clientId:
    import.meta.env.VITE_AUTH0_CLIENT_ID ?? 'Q9sFq4eZP69FSpksBJdOX4xExcKOmDuF',
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_REDIRECT_URI ?? 'http://localhost:5173',
    audience: 'https://job-tracker-production-9dd2.up.railway.app',
  },
  cacheLocation: 'localstorage' as const,
  useRefreshTokens: true,
};
