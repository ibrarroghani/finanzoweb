export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID || '',
    authority: process.env.NEXT_PUBLIC_MSAL_AUTHORITY || '',
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || '',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: () => {},
      piiLoggingEnabled: false,
    },
  },
};

export const b2cConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_B2C_CLIENT_ID || '',
    authority: process.env.NEXT_PUBLIC_B2C_AUTHORITY || '',
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || '',
    knownAuthorities: [process.env.NEXT_PUBLIC_B2C_KNOWN_AUTHORITY || ''],
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};
export const loginRequest = {
  scopes: ['User.ReadWrite', 'mail.send'],
  prompt: 'select_account',
};

export const b2cLoginRequest = {
  scopes: ['openid', 'profile', 'offline_access'],
};

export const b2cSignupRequest = {
  scopes: ['openid', 'profile', 'offline_access', 'email'],
  authority: process.env.NEXT_PUBLIC_B2C_SIGNUP_AUTHORITY || '',
};
