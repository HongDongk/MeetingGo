import { createAsyncThunk } from '@reduxjs/toolkit';
import backend from '../../util/backend';
import { STORAGE_KEY_ACCESS_TOKEN } from '../../config/constants';

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await backend.get(`/auth/signout`, {
    withCredentials: true,
  });

  // acessToken 삭제
  localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN);

  return response.data;
});

export const refreshJwtToken = createAsyncThunk(
  'user/refreshJwtToken',
  async () => {
    const response = await backend.get(`/auth/refresh`, {
      withCredentials: true,
    });

    return response.data;
  },
);

export const loadUserAgreements = createAsyncThunk(
  'user/agreements',
  async () => {
    const response = await backend.get(`/users/agreements`);

    return response.data;
  },
);
