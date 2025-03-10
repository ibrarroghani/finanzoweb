import { PublicClientApplication } from '@azure/msal-browser';
import {
  msalConfig,
  b2cConfig,
  loginRequest,
  b2cLoginRequest,
  b2cSignupRequest,
} from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const b2cInstance = new PublicClientApplication(b2cConfig);

let isInteractionInProgress = false;

export const loginWithMicrosoft = async () => {
  if (isInteractionInProgress) {
    console.log('An interaction is already in progress.');
    return null;
  }

  try {
    isInteractionInProgress = true;
    await msalInstance.initialize();
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    if (loginResponse.account) {
      msalInstance.setActiveAccount(loginResponse.account);
      return loginResponse.account;
    }
  } catch (error) {
    console.error('Microsoft login failed:', error);
    return null;
  } finally {
    isInteractionInProgress = false;
  }
};

export const loginWithB2C = async () => {
  try {
    await b2cInstance.initialize();
    const loginResponse = await b2cInstance.loginPopup(b2cLoginRequest);
    if (loginResponse.account) {
      b2cInstance.setActiveAccount(loginResponse.account);
      return loginResponse.account;
    }
  } catch (error) {
    console.error('B2C login failed:', error);
  }
  return null;
};

export const logout = async () => {
  if (isInteractionInProgress) {
    console.log('An interaction is already in progress.');
    return;
  }

  try {
    isInteractionInProgress = true;
    const activeAccount = msalInstance.getActiveAccount();
    const activeB2C = b2cInstance.getActiveAccount();
    if (activeAccount || activeB2C) {
    localStorage.removeItem('dummyAuthToken');
      try {
        if (activeB2C) {
          await b2cInstance.logoutPopup();
        } else if (activeAccount) {
          await msalInstance.logoutPopup();
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    isInteractionInProgress = false;
  }
};

export const signupWithB2C = async () => {
  if (isInteractionInProgress) {
    console.log('An interaction is already in progress.');
    return null;
  }

  try {
    isInteractionInProgress = true;
    await b2cInstance.initialize();
    const signupResponse = await b2cInstance.loginPopup(b2cSignupRequest);
    if (signupResponse.account) {
      b2cInstance.setActiveAccount(signupResponse.account);
      return signupResponse.account;
    }
  } catch (error) {
    console.error('B2C signup failed:', error);
    return null;
  } finally {
    isInteractionInProgress = false;
  }
};
