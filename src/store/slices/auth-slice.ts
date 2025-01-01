import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  name: string;
  email: string;
  user_type: string;
  slug: string;
}

interface IClient {
  name: string;
  email: string;
  image: string;
  slug: string;
  address: string;
  phone: string;
  status: number;
}

export interface IAuthState {
  user: IUser;
  client: IClient;
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
  client: {
    name: '',
    email: '',
    image: '',
    slug: '',
    address: '',
    phone: '',
    status: 0,
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
    //eslint-disable-next-line
    setClient: (state, action: PayloadAction<IClient>) => {
      // const { name, email, profile_picture_url, slug, address, phone_number } =
      //   action.payload;
      // console.log('action.payload', action.payload);
      // state.client.name = name;
      // state.client.email = email;
      // state.client.image = profile_picture_url;
      // state.client.slug = slug;
      // state.client.address = address;
      // state.client.phone = phone_number;
      state.client = action.payload;
    },
  },
});

export const { setLoading, setClient } = authSlice.actions;

export default authSlice.reducer;
