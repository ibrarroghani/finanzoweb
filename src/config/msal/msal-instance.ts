import {
  EventType,
  PublicClientApplication,
  AuthenticationResult,
} from '@azure/msal-browser';
import msalConfig from './msal-config';

export const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize().then(() => {
  // Default to using the first account if no account is active on page load
  if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // Optional - This will update account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();

  msalInstance.addEventCallback((event) => {
    if (
      event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS
    ) {
      const payload = event.payload;
      if ((payload as AuthenticationResult)?.account) {
        const account = (payload as AuthenticationResult).account;
        msalInstance.setActiveAccount(account);
      }
    }
  });
});
