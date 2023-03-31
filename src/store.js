import { configureStore } from '@reduxjs/toolkit';
import user from './features/user';
import apply from './features/apply';
import matching from './features/matching';
import { backendApi } from './features/backendApi';

const store = configureStore({
  reducer: {
    user,
    apply,
    matching,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});

export default store;
