import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ISingUpState {
  step: number;
  user: IUser;
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
    setUser: (state, action: PayloadAction<IUser>) => {
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
