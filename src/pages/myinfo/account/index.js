import { Button, Card, Col, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Accordion from '../../../components/Accordion';
import PrimaryModal from '../../../components/Modal/PrimaryModal';
import PrimaryButton from '../../../components/PrimaryButton';
import Section from '../../../components/Section';
import { MEMBER_COUNT_LABELS } from '../../../config/constants';
import {
  useGetMyInfoQuery,
  useGetUserTeamsQuery,
} from '../../../features/backendApi';
import { logout } from '../../../features/user/asyncActions';
import MyinfoLayout from '../../../layout/MyinfoLayout';
import backend from '../../../util/backend';

export default function Account() {
  const [resignModalOpened, setResignModalOpened] = useState(false);
  const { data: myInfo } = useGetMyInfoQuery();
  const { data: teamsData } = useGetUserTeamsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteAccount = useCallback(async () => {
    try {
      await backend.delete('/auth/account', {
        withCredentials: true,
      });
      window.alert('탈퇴되었습니다');
      dispatch(logout());
      localStorage.clear();
      navigate('/');
    } catch (e) {
      console.error(e);
      window.alert('탈퇴중 오류가 발생하였습니다');
    }
  });

  return (
    <MyinfoLayout title="계정 관리">
      <Section my="12px">
        <Subtitle>내 정보</Subtitle>
        <InfoCard>
          <Row>
            <Col span={4}>이름</Col>
            <Col span={20}>{myInfo?.nickname}</Col>
          </Row>
          <Row>
            <Col span={4}>전화번호</Col>
            <Col span={20}>
              {myInfo?.phone}{' '}
              <PhoneChangeButton
                onClick={() => navigate('/myinfo/account/phone')}
              >
                변경
              </PhoneChangeButton>
            </Col>
          </Row>
        </InfoCard>
      </Section>
      <Section>
        <Accordion
          title={<AccordionTitle>신청 내역</AccordionTitle>}
          content={
            <HistoryContainer>
              <HistoryListText>
                {myInfo?.nickname} 님은 지금까지{' '}
                <span>{teamsData?.teams.length}회</span> 미팅 신청했어요!
              </HistoryListText>
              <HistoryList>
                {teamsData?.teams.map((team) => (
                  <HistoryItem key={team.id}>
                    <HistoryTitleText>
                      {MEMBER_COUNT_LABELS[team.memberCount]} 미팅
                    </HistoryTitleText>
                    <div>
                      <HistoryDateText>
                        {dayjs(team.createdAt).format('YYYY. MM. DD HH:mmA')}{' '}
                      </HistoryDateText>
                      <HistoryStatusText>
                        {team.chatCreatedAt ? '매칭 완료' : '신청 완료'}
                      </HistoryStatusText>
                    </div>
                  </HistoryItem>
                ))}
              </HistoryList>
            </HistoryContainer>
          }
        />
      </Section>
      <Section my="8px" style={{ textAlign: 'right' }}>
        <ResignButton type="text" onClick={() => setResignModalOpened(true)}>
          회원 탈퇴
        </ResignButton>
      </Section>
      <PrimaryModal
        title=" "
        open={resignModalOpened}
        onCancel={() => setResignModalOpened(false)}
        footer={null}
      >
        <Space
          direction="vertical"
          style={{ padding: '12px 0', textAlign: 'center' }}
        >
          <span>
            지금 탈퇴하시면 미팅학개론에서의 모든 기록이 사라져요. 그래도
            탈퇴하시겠어요?
          </span>
          <PrimaryButton onClick={deleteAccount}>탈퇴하기</PrimaryButton>
        </Space>
      </PrimaryModal>
    </MyinfoLayout>
  );
}

const Subtitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.grey};
  padding-left: 6px;
  padding-bottom: 5px;
`;

const InfoCard = styled(Card)`
  .ant-col {
    font-family: 'Nanum JungHagSaeng';
    font-size: 18px;

    :first-child {
      color: #bbbbbb;
    }
    :last-child {
      color: #777777;
    }
  }
`;

const AccordionTitle = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #777777;
`;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const HistoryList = styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
  width: 100%;
`;

const HistoryListText = styled.span`
  font-family: 'Nanum JungHagSaeng';
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  > span {
    color: #eb8888;
  }
`;

const HistoryItem = styled.div`
  background: #fff5f5;
  border: 1px solid #eb8888;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
`;

const HistoryTitleText = styled.span`
  color: #777777;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
`;

const HistoryDateText = styled.span`
  color: #777777;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
`;

const HistoryStatusText = styled.span`
  color: #eb8888;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  margin-left: 4px;
`;

const ResignButton = styled(Button)`
  > span {
    color: ${(props) => props.theme.grey};
  }
`;

const PhoneChangeButton = styled(Button).attrs({ type: 'text' })`
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
