'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from '@/store/slices/auth-slice';
import signUpSlice from '@/store/slices/sign-up-slice';
import forgetPasswordSlice from '@/store/slices/forget-password-slice';

import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authSlice,
  signUp: signUpSlice,
  forgetPassword: forgetPasswordSlice,
});

const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistStores = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
