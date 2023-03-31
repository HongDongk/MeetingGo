import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { ReactComponent as Meetinge } from '../../asset/svg/RainBowMeetinge.svg';
import { ReactComponent as ProcessBar3 } from '../../asset/svg/ProcessBar3.svg';
import { ReactComponent as CircleArrow } from '../../asset/svg/CircleArrow.svg';
import { ReactComponent as MatchingText4 } from '../../asset/svg/MatchingText4.svg';
// 로그인하고 매칭증에 상대방이랑 매칭됬을 때 매칭조회페이지

export default function LoginMatchOk() {
  const navigate = useNavigate();

  return (
    <Content>
      <ProcessBar3 />
      <Top>
        <LeftTop>
          매칭결과
          <SCircleArrow
            onClick={() => {
              window.location.reload();
            }}
          />
        </LeftTop>
        <RightTop
          onClick={() => {
            navigate('/matching/myteam');
          }}
        >
          우리 팀 프로필 조회하기
        </RightTop>
      </Top>
      <WhiteBox>
        <Meetinge />
        <SMatchingText4 />
        <MeetingButton
          onClick={() => {
            navigate('/matching/otherteam');
          }}
        >
          결과 조회하기
        </MeetingButton>
      </WhiteBox>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const Top = styled.div`
  width: 334px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: #777777;
`;

const LeftTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  font-weight: 600;
  font-size: 14px;
`;

const SCircleArrow = styled(CircleArrow)`
  &:hover {
    cursor: pointer;
  }
`;

const RightTop = styled.div`
  display: flex;
  font-weight: 300;
  font-size: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const WhiteBox = styled.div`
  width: 334px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding: 50px 0;
  background: #ffffff;
  border-radius: 10px;
`;

const SMatchingText4 = styled(MatchingText4)`
  margin-top: 5%;
`;

const MeetingButton = styled(Button)`
  font-family: 'Nanum JungHagSaeng';
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  border: none;
  margin-top: 7%;
  width: 160px;
  height: 50px;
  background: #eb8888;
  border-radius: 10px;
`;
