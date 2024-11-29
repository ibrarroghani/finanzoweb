import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
