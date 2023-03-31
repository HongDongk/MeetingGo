import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MyinfoLayout from '../../../../layout/MyinfoLayout';

export default function TicketBuyFailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 사용자가 결제를 취소한 것이 아닌 경우 에러메세지 출력
    if (searchParams.get('code') !== 'PAY_PROCESS_CANCELED') {
      window.alert(searchParams.get('message'));
    }
    navigate('../myinfo/ticket/buy', { replace: true });
  }, [navigate, searchParams]);

  return <MyinfoLayout title="이용권 구매" />;
}
