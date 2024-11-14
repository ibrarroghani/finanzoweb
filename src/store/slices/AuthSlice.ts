// store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import {
  IPublicClientApplication,
  AuthenticationResult,
} from '@azure/msal-browser';
import ApiService from '@/utils/services/api-service';

interface IUser {
  name: string;
  email: string;
  user_type: string;
}

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (msalInstance: IPublicClientApplication, { rejectWithValue }) => {
    try {
      const response: AuthenticationResult = await msalInstance.loginPopup();
      console.log('response', response);
      const accessToken = response.accessToken;

      const res = await ApiService.post('/auth/login', {
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

      ApiService.defaults.headers['Authorization'] =
        `Bearer ${validatedBackendToken}`;

      return backendUser;
    } catch (error) {
      console.log('error', error);
      notification.error({
        message: 'Login Failed',
        description: 'There was an issue logging in. Please try again.',
        placement: 'topRight',
      });
      return rejectWithValue('Login failed');
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (
    msalInstance: IPublicClientApplication,
    { dispatch, rejectWithValue }
  ) => {
    try {
      await msalInstance.logoutPopup();
      sessionStorage.clear();
      dispatch(clearAuth());
    } catch (error) {
      console.log('error', error);
      notification.error({
        message: 'Logout Failed',
        description: 'There was an issue logging out. Please try again.',
        placement: 'topRight',
      });
      return rejectWithValue('Logout failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, clearAuth } = authSlice.actions;

export default authSlice.reducer;
