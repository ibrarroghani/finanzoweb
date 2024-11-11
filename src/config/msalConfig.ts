import { Configuration } from '@azure/msal-browser';

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
    authority: process.env.NEXT_PUBLIC_AZURE_AD_AUTHORITY!,
    redirectUri: process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI!,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: process.env.NEXT_PUBLIC_AZURE_AD_SCOPES?.split(',') || ['User.Read'],
  prompt: 'select_account',
};

export default msalConfig;
