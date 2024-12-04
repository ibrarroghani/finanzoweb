import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IForgetPasswordState {
  step: number;
  email: string;
}

const initialState: IForgetPasswordState = {
  step: 1,
  email: '',
};

const forgetPasswordSlice = createSlice({
  name: 'forget-password',
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

export const { increment, decrement, setEmail } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
