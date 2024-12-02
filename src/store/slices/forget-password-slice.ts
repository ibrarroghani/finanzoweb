import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IForgetPasswordState {
  step: number;
  email: string;
}

const initialState: IForgetPasswordState = {
  step: 1,
  email: '',
};

// Auth slice
const forgetPasswordSlice = createSlice({
  name: 'sign-up',
  initialState,
  reducers: {
    increment: (state) => {
      state.step = state.step + 1;
    },
    decrement: (state) => {
      state.step = state.step - 1;
    },
    setEmail: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
  },
});

export const { increment, decrement } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
