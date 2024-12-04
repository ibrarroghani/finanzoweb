import { ISignUpFormData } from '@/app/sign-up/interfaces/sign-up-interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISingUpState {
  step: number;
  user: ISignUpFormData;
}

const initialState: ISingUpState = {
  step: 1,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

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
    setUser: (state, action: PayloadAction<ISignUpFormData>) => {
      const { firstName, lastName, email, password, confirmPassword } =
        action.payload;
      state.user.firstName = firstName;
      state.user.lastName = lastName;
      state.user.email = email;
      state.user.password = password;
      state.user.confirmPassword = confirmPassword;
    },
  },
});

export const { increment, decrement, setUser } = signUpSlice.actions;

export default signUpSlice.reducer;
