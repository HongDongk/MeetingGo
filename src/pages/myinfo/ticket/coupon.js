import styled from 'styled-components';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useCallback, useMemo, useState } from 'react';
import MyinfoLayout from '../../../layout/MyinfoLayout';
import Section, { SectionTitle } from '../../../components/Section';
import CouponItem from '../../../components/CouponItem';
import {
  useGetCouponsPageDataQuery,
  useGetUserCouponsQuery,
} from '../../../features/backendApi';
import backend from '../../../util/backend';

export default function TicketCouponPage() {
  const { data: couponPageData } = useGetCouponsPageDataQuery();
  const { data: couponData, refetch } = useGetUserCouponsQuery();
  const [couponCode, setCouponCode] = useState();

  const handleRefetchCouponData = () => {
    refetch();
  };

  useEffect(() => {
    handleRefetchCouponData();
  }, [couponData]);

  const handleCouponCode = useCallback(
    (e) => {
      setCouponCode(e.target.value);
    },
    [couponCode],
  );

  const registerCoupon = useCallback(async () => {
    if (couponCode) {
      try {
        await backend.put('/coupons/register', { code: couponCode });
        alert('쿠폰이 등록되었습니다');
        handleRefetchCouponData();
      } catch (e) {
        if (e.response.data.message === 'already issued coupon') {
          alert('이미 등록된 쿠폰입니다');
        } else {
          alert('올바르지 않은 쿠폰번호 입니다');
        }
      }
    }
  });

  const coupons = useMemo(() => {
    const couponTypes = couponPageData?.CouponTypes;
    return couponData
      ? couponData.coupons.map((coupon) => ({
          ...coupon,
          type: couponTypes?.find((type) => type.id === coupon.typeId),
        }))
      : [];
  });

  return (
    <MyinfoLayout title="보유 쿠폰">
      <Section>
        <SectionTitle>쿠폰 등록</SectionTitle>
        <CouponCodeBox>
          <CouponCodeTitle>쿠폰 코드</CouponCodeTitle>
          <CouponCodeInput
            value={couponCode}
            onChange={handleCouponCode}
            placeholder="ABCD1234"
          />
          <RegisterButton onClick={registerCoupon}>등록하기</RegisterButton>
        </CouponCodeBox>
      </Section>
      <Section my="24px">
        <SectionTitle>보유 쿠폰 {coupons.length}</SectionTitle>
        <CouponListBox>
          {coupons.length === 0 && (
            <NoCouponText>사용 가능한 쿠폰이 없어요</NoCouponText>
          )}
          {coupons.map((coupon) => (
            <CouponItem
              title={coupon.type.name}
              expireText={
                coupon.expiresAt
                  ? `${dayjs(coupon.expiresAt).format('YYYY. MM. DD')} 까지`
                  : ' '
              }
              tipText={`*${coupon.type.condition}`}
            />
          ))}
        </CouponListBox>
      </Section>
    </MyinfoLayout>
  );
}

const CouponCodeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #f8f3f3;
  border-radius: 10px;
  padding: 12px;
  gap: 8px;
`;

const CouponCodeTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #777777;
  min-width: 52px;
  padding: 0 10px;
`;

const CouponCodeInput = styled(Input)`
  background: #f1ecec;
  font-weight: 600;

  ::placeholder {
    color: #c0c0c0;
  }
`;

const RegisterButton = styled(Button).attrs({ type: 'text' })`
  height: auto;
  font-family: 'Nanum JungHagSaeng';
  padding: 4px 12px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.pink};
  border: none;
  box-shadow: none;

  > span {
    font-weight: 400;
    font-size: 13px;
    color: white;
  }
`;

const CouponListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #f8f3f3;
  border-radius: 10px;
  padding: 22px 44px;
  gap: 8px;
`;

const NoCouponText = styled.span`
  font-size: 14px;
  color: #777777;
  padding: 12px 0;
`;
