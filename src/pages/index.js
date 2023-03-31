/* eslint-disable no-restricted-globals */
/* eslint-disable no-unsafe-optional-chaining */
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import theme from '../style/theme';
import CounterBox from '../components/CounterBox';
import { ReactComponent as MainImg } from '../asset/svg/MeetingHaek.svg';
import PresentBox from '../asset/img/Present.png';
import Main1 from '../asset/img/Main1.png';
import Main2 from '../asset/img/Main2.png';
import Main3 from '../asset/img/Main3.png';
import Main4 from '../asset/img/Main4.png';
import Main5 from '../asset/img/Main5.png';
import Main6 from '../asset/img/Main6.png';
import MainLayout from '../layout/MainLayout';
import BottomFooter from '../layout/footer/BottomFooter';
import MainFooter from '../layout/footer/MainFooter';
import Section from '../components/Section';
import backend from '../util/backend';
import {
  useGetTeamCountQuery,
  useGetTeamMembersCountTotalQuery,
  useGetUserAgreementsQuery,
} from '../features/backendApi';
import ChannelTalk from '../asset/ChannelTalk';

function Main() {
  const params = new URLSearchParams(window.location.search);
  const referralId = params.get('referralId');
  const { finishedStep } = useSelector((store) => store.apply);
  const { accessToken } = useSelector((state) => state.user);
  const { data: teamData } = useGetTeamCountQuery();
  const { data: userCountData } = useGetTeamMembersCountTotalQuery();
  const [matchingStatus, setMatchingStatus] = useState('');
  const { data: agreementsData } = useGetUserAgreementsQuery();

  const navigate = useNavigate();

  const getMatchingInfo = useCallback(async () => {
    const matchingstatus = await backend.get('/users/matchings/status');
    setMatchingStatus(matchingstatus.data.matchingStatus);
  }, []);

  useEffect(() => {
    if (referralId !== null) {
      sessionStorage.setItem('referralId', referralId);
    }
    getMatchingInfo();
  }, [getMatchingInfo, referralId]);

  const handleStart = useCallback(() => {
    if (!accessToken) {
      navigate('/myinfo');
    } else if (['NOT_RESPONDED', null].includes(matchingStatus)) {
      if (!agreementsData) {
        navigate('/apply/agree');
      } else {
        navigate(`/apply/1`);
      }
    } else {
      window.alert('현재 매칭이 진행 중이라 새로운 미팅신청이 불가합니다');
    }
  }, [accessToken, matchingStatus, navigate, agreementsData, finishedStep]);

  const teamsPerRound = teamData?.['teamsPerRound'];
  const twoman = teamData?.['2vs2']['male'];
  const twogirl = teamData?.['2vs2']['female'];
  const threeman = teamData?.['3vs3']['male'];
  const threegirl = teamData?.['3vs3']['female'];

  return (
    <MainLayout>
      <Section>
        <ImgBox>
          <MainImg />
          <SImg
            src={PresentBox}
            onClick={() => {
              navigate('/myinfo');
            }}
          />
        </ImgBox>
        <CountTitle>
          <MainTitle>
            지금까지 &nbsp;
            <CounterBox end={userCountData?.memberCount || 0} /> 명이
            미팅학개론과 함께했어요
          </MainTitle>
        </CountTitle>
      </Section>
      {/*
      <Section my="50px">
        <TopTitle>신청 현황</TopTitle>
        <MatchingBox>
          <SubTitle>2 : 2 미팅</SubTitle>
          <TotalBar>
            <Number>{twoman}</Number>
            <LeftBar>
              <LeftBarProgress progress={twoman / teamsPerRound} />
            </LeftBar>
            <RightBar>
              <RightBarProgress progress={twogirl / teamsPerRound} />
            </RightBar>
            <Number>{twogirl}</Number>
          </TotalBar>
          <SubTitle>3 : 3 미팅</SubTitle>
          <TotalBar>
            <Number>{threeman}</Number>
            <LeftBar>
              <LeftBarProgress progress={threeman / teamsPerRound} />
            </LeftBar>
            <RightBar>
              <RightBarProgress progress={threegirl / teamsPerRound} />
            </RightBar>
            <Number>{threegirl}</Number>
          </TotalBar>
          <Title>조건이 맞는 상대팀이 나타나면 바로 매칭됩니다!</Title>
        </MatchingBox>
      </Section>
      */}
      <Section my="50px" center>
        <SImg2 src={Main1} />
        <SImg2 src={Main2} />
        <SImg2 src={Main3} />
        <SImg2 src={Main4} />
        <SImg2 src={Main5} />
        <SImg2 src={Main6} />
        <FixedButton onClick={handleStart}>지금 바로 미팅하기</FixedButton>
      </Section>
      <MainFooter />
      <BottomFooter />
      <div>{ChannelTalk.hideChannelButton()}</div>
    </MainLayout>
  );
}

export default Main;

const CountTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MainTitle = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #635e5e;
  font-weight: 400;
  font-size: 14px;
  height: 33px;
  width: 290px;
  background: rgba(255, 191, 191, 0.15);
  border-radius: 10px;
`;

const TopTitle = styled.div`
  margin-left: 5%;
  font-weight: 400;
  font-size: 13px;
  color: #635e5e;
`;

const ImgBox = styled.div`
  margin-top: 50px;
  margin-right: 25px;
  position: relative;
  max-width: 100%;
  display: flex;
  justify-content: center;

  > svg {
    width: 75%;
    height: auto;
  }
`;

const SImg = styled.img`
  position: absolute;
  bottom: -15%;
  right: 5%;
  &:hover {
    cursor: pointer;
  }
`;

const SImg2 = styled.img`
  width: 100%;
`;

const MatchingBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  font-family: 'Nanum JungHagSaeng';
  font-weight: 400;
  font-size: 20px;
  padding: 10px;
  height: 150px;
  background: #ffffff;
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.p`
  margin-top: 5%;
  width: 100%;
  color: ${theme.pink};
`;

const SubTitle = styled.p`
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  color: black;
  margin-top: 5px;
`;

const TotalBar = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const LeftBar = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 110px;
  height: 18px;
  background: white;
  border: 1px solid #f1ecec;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const RightBar = styled.div`
  position: relative;
  width: 110px;
  height: 18px;
  background: white;
  border: 1px solid #f1ecec;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const LeftBarProgress = styled.div`
  position: absolute;
  max-width: 110px;
  width: ${({ progress }) => (progress ? progress * 110 : 0)}px;
  height: 18px;
  background: #bfe0ff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const RightBarProgress = styled.div`
  position: absolute;
  max-width: 110px;
  width: ${({ progress }) => (progress ? progress * 110 : 0)}px;
  height: 18px;
  background: #ffbfbf;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Number = styled.p`
  width: 10px;
  padding: 0 10px;
  font-family: 'Nanum JungHagSaeng';
  font-weight: 400;
  font-size: 15px;
`;

const FixedButton = styled(Button).attrs({ type: 'primary', size: 'large' })`
  width: 75%;
  position: sticky;
  bottom: 10vh;
  left: 10px;
  margin-top: 15px;
  &.ant-btn {
    height: 56px;
    background-color: #ffa1a1;
  }
  &:hover {
    cursor: pointer;
  }
`;
