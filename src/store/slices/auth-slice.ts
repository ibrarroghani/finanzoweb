import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  name: string;
  email: string;
  user_type: string;
  slug: string;
}

export interface IAuthState {
  user: IUser;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: IAuthState = {
  user: {
    name: '',
    email: '',
    user_type: '',
    slug: 'user-1ee15520-a58e-11ef-878e-6045bd08fbb0-1ee15525-a58e-11ef-878e-6045bd08fbb0',
  },
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
