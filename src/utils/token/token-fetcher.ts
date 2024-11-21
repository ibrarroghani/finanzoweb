import { msalInstance } from '@/config/msal/msal-instance';
import { checkTokenIsValid } from './token-validator';
import { AccountInfo } from '@azure/msal-browser';
import { defaultScopes } from '@/config/msal/msalConfig';

async function getToken() {
  try {
    const secretBearerToken = sessionStorage.getItem('accessToken');

    if (secretBearerToken && checkTokenIsValid(secretBearerToken)) {
      return secretBearerToken;
    }
    const account: AccountInfo | null = msalInstance.getActiveAccount();
    if (!account) {
      sessionStorage.clear();
      window.location.href = '/login';
      return;
    }

    const response = await msalInstance.acquireTokenSilent({
      account,
      scopes: defaultScopes,
    });

    const { accessToken } = response;
    sessionStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log('MSAL Token Re-Fetching error', error);
  }
}

export default getToken;
