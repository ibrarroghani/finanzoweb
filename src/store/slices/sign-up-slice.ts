import { createSlice } from '@reduxjs/toolkit';

interface ISingUpState {
  step: number;
  email: string;
}

const initialState: ISingUpState = {
  step: 1,
  email: '',
};

// Auth slice
const signUpSlice = createSlice({
  name: 'sign-up',
  initialState,
  reducers: {
    increment: (state) => {
      state.step = state.step + 1;
    },
    decrement: (state) => {
      state.step = state.step - 1;
    },
  },
});

export const { increment, decrement } = signUpSlice.actions;

export default signUpSlice.reducer;
