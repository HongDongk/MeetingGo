import { useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { STORAGE_KEY_ORDER_DATA } from '../../../../config/constants';
import MyinfoLayout from '../../../../layout/MyinfoLayout';
import backend from '../../../../util/backend';

export default function TicketBuySuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const finishOrder = useCallback(async () => {
    const orderData = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY_ORDER_DATA),
    );

    try {
      await backend.post('/orders', {
        ...orderData,
        toss: {
          paymentKey: searchParams.get('paymentKey'),
          amount: Number(searchParams.get('amount')),
          orderId: searchParams.get('orderId'),
        },
      });

      window.alert('이용권이 구매되었습니다');
      navigate('../myinfo/ticket', { replace: true }); // 이용권 현황 페이지
    } catch (error) {
      if (error.response.status === 400) {
        window.alert(error.response.data.message);
      } else {
        window.alert('오류가 발생하였습니다');
      }
      navigate('../myinfo/ticket/buy', { replace: true }); // 이용권 구매 페이지
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    finishOrder();
  }, [finishOrder]);

  return <MyinfoLayout title="이용권 구매" />;
}
