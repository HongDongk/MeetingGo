import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuBox, { LinkButton, MenuItem } from '../../../components/MenuBox';
import Section from '../../../components/Section';
import MyinfoLayout from '../../../layout/MyinfoLayout';
import { ReactComponent as RightArrow } from '../../../asset/svg/RightArrow.svg';
import {
  useGetUserCouponCountQuery,
  useGetUserTicketCountQuery,
} from '../../../features/backendApi';

export default function TicketPage() {
  const { data: ticketData, refetch: refetchTicketData } =
    useGetUserTicketCountQuery();
  const { data: couponData, refetch: refetchCouponData } =
    useGetUserCouponCountQuery();

  useEffect(() => {
    refetchTicketData();
  }, [refetchTicketData]);

  useEffect(() => {
    refetchCouponData();
  }, [refetchCouponData]);

  return (
    <MyinfoLayout title="이용권 현황">
      <Section>
        <CardContainer>
          <InfoCard>
            <InfoTitle>미사용 이용권</InfoTitle>
            <InfoContent>
              <span>{ticketData?.ticketCount}</span>장
            </InfoContent>
          </InfoCard>
          <InfoCard>
            <InfoTitle>할인 쿠폰</InfoTitle>
            <InfoContent>
              <span>{couponData?.couponCount}</span>장
            </InfoContent>
          </InfoCard>
        </CardContainer>
      </Section>
      <Section>
        <MenuBox>
          <MenuItem>
            <Link to="/myinfo/ticket/buy">
              <LinkButton>
                이용권 구매 <RightArrow />
              </LinkButton>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/myinfo/ticket/coupon">
              <LinkButton>
                보유 쿠폰 <RightArrow />
              </LinkButton>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/myinfo/ticket/history">
              <LinkButton>
                결제 내역 <RightArrow />
              </LinkButton>
            </Link>
          </MenuItem>
        </MenuBox>
      </Section>
    </MyinfoLayout>
  );
}

const CardContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #ffffff;
  padding: 14px 18px;
  width: 100%;
  text-align: center;
  color: #777777;
  border: 1px solid #f1ecec;
`;

const InfoTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
`;

const InfoContent = styled.div`
  font-weight: 600;
  font-size: 12px;
  > span {
    font-size: 24px;
    margin-right: 8px;
  }
`;
