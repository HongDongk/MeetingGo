import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { STORAGE_KEY_ACCESS_TOKEN } from '../config/constants';
import {
  loadUserAgreements,
  refreshJwtToken,
} from '../features/user/asyncActions';
import useInterval from '../hooks/useInterval';

export default function JwtProvider() {
  const dispatch = useDispatch();

  const checkTokenAndRefresh = useCallback(() => {
    const storageAccessToken = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);

    if (!storageAccessToken) {
      return;
    }

    dispatch(refreshJwtToken());
    dispatch(loadUserAgreements());
  }, [dispatch]);

  // JWT 토큰 초기 Refresh
  useEffect(() => {
    checkTokenAndRefresh();
  }, [checkTokenAndRefresh]);

  // JWT 토큰 주기적 Refresh 시도 (10분 간격)
  useInterval(checkTokenAndRefresh, 10 * 60 * 1000);
}
