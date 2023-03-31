import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Flex from '../../../components/Flex';
import Section from '../../../components/Section';
import {
  useGetCouponsPageDataQuery,
  useGetOrdersPageDataQuery,
  useGetUserOrdersQuery,
} from '../../../features/backendApi';
import MyinfoLayout from '../../../layout/MyinfoLayout';

export default function TicketHistoryPage() {
  const { data: orderPageData } = useGetOrdersPageDataQuery();
  const { data: couponPageData } = useGetCouponsPageDataQuery();
  const { data: orderData, refetch } = useGetUserOrdersQuery();

  const handleRefetchOrderData = () => {
    refetch();
  };

  useEffect(() => {
    handleRefetchOrderData();
  }, [orderData]);

  const orders = useMemo(() => {
    const products = orderPageData?.Products;
    const couponTypes = couponPageData?.CouponTypes;

    return orderData
      ? orderData.orders.map((order) => ({
          ...order,
          product: products?.find((p) => p.id === order.productId),
          couponType: couponTypes?.find((c) => c.id === order.couponTypeId),
        }))
      : [];
  });

  return (
    <MyinfoLayout title="결제 내역">
      <Section>
        <HistoryListBox>
          {orders.length === 0 ? (
            <NoOrderText>결제 내역이 없습니다</NoOrderText>
          ) : (
            orders.map((order) => (
              <HistoryItem key={order.id}>
                <Flex>
                  <HistoryTitle>{order.product?.name} 구매</HistoryTitle>
                  <HistoryPrice>
                    {order.totalAmount.toLocaleString()}원
                  </HistoryPrice>
                </Flex>
                <Flex gap="10px">
                  <HistoryTip>
                    {order.couponType
                      ? `*${
                          order.couponType.name.startsWith('미팅학개론')
                            ? order.couponType.name.split('미팅학개론')[1]
                            : order.couponType.name
                        } 사용`
                      : ''}
                  </HistoryTip>
                  <HistoryTip />
                  <HistoryDate>
                    {dayjs(order.createdAt).format('YYYY. MM. DD HH:mmA')} 결제
                  </HistoryDate>
                </Flex>
              </HistoryItem>
            ))
          )}
        </HistoryListBox>
      </Section>
    </MyinfoLayout>
  );
}

const HistoryListBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  border: 1px solid #f8f3f3;
  border-radius: 10px;
  padding: 44px 22px;
  gap: 16px;
`;

const HistoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 3px;
  padding: 24px;
  background: #fff5f5;
  border: 1px solid #eb8888;
`;

const HistoryTitle = styled.div`
  font-size: 13px;
  color: #777777;
`;

const HistoryPrice = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #eb8888;
`;

const HistoryTip = styled.div`
  font-weight: 300;
  font-size: 10px;
  color: #777777;
`;

const HistoryDate = styled.div`
  font-size: 10px;
  color: #777777;
`;

const NoOrderText = styled.div`
  font-size: 14px;
  color: #777777;
  padding: 12px 0;
  text-align: center;
`;
