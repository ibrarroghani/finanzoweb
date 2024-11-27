import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import {
  IPublicClientApplication,
  AuthenticationResult,
  BrowserAuthError,
} from '@azure/msal-browser';
import apiService from '@/utils/services/api-service';
import { defaultScopes } from '@/config/msal/msal-config';

const LOGIN = 'auth/login';
const LOGOUT = 'auth/logout';

interface IUser {
  name: string;
  email: string;
  user_type: string;
}

interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const login = createAsyncThunk(
  LOGIN,
  async (msalInstance: IPublicClientApplication, { rejectWithValue }) => {
    try {
      const response: AuthenticationResult = await msalInstance.loginPopup({
        scopes: defaultScopes,
      });
      const accessToken = response.accessToken;

      const res = await apiService.post('/auth/login', {
        user: {
          name: response.account?.name,
          email: response.account?.username,
          user_type: 'broker',
        },
        accessToken: accessToken,
      });

      const { user: backendUser, accessToken: validatedBackendToken } =
        res.data;

      sessionStorage.setItem('accessToken', validatedBackendToken);

      apiService.defaults.headers['Authorization'] =
        `Bearer ${validatedBackendToken}`;

      return backendUser;
    } catch (error) {
      const errorMessage =
        error instanceof BrowserAuthError
          ? error.errorMessage
          : 'An unexpected error occurred during login.';
      notification.error({
        message: 'Login Failed',
        description: errorMessage,
        placement: 'topRight',
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk(
  LOGOUT,
  async (msalInstance: IPublicClientApplication, { rejectWithValue }) => {
    try {
      sessionStorage.clear();
      localStorage.clear();
      await msalInstance.logoutRedirect({
        postLogoutRedirectUri: '/logout-success',
      });
    } catch (error) {
      const errorMessage =
        error instanceof BrowserAuthError
          ? error.errorMessage
          : 'An unexpected error occurred during logout.';
      notification.error({
        message: 'Logout Failed',
        description: errorMessage,
        placement: 'topRight',
      });
      return rejectWithValue(errorMessage);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { name, email, user_type } = action.payload;
        state.loading = false;
        state.user = { name, email, user_type };
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, clearAuth } = authSlice.actions;

export default authSlice.reducer;
