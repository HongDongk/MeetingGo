import { Spin } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { setAccessToken } from '../../../../features/user';
import backend from '../../../../util/backend';

export default function KakakoLoginSuccessPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAgreements = useCallback(async () => {
    try {
      const { data } = await backend.get('/users/agreements');

      if (data) {
        navigate('/');
      }
    } catch (e) {
      navigate('/apply/agree');
    }
  }, [navigate]);

  useEffect(() => {
    const access = searchParams.get('access');
    if (access) {
      dispatch(setAccessToken(access));
      checkAgreements();
    }
  }, [checkAgreements, dispatch, navigate, searchParams]);

  return <CustomSpin size="large" />;
}

const CustomSpin = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #eb8888;
`;
