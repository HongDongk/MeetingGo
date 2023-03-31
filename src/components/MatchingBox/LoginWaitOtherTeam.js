// 로그인하고 매칭증에 상대방의 수락여부기다릴때 매칭조회페이지
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as BigO } from '../../asset/svg/BigO.svg';
import { ReactComponent as ProcessBar3 } from '../../asset/svg/ProcessBar3.svg';
import { ReactComponent as CircleArrow } from '../../asset/svg/CircleArrow.svg';
import { ReactComponent as MatchingText10 } from '../../asset/svg/MatchingText10.svg';

export default function LoginWaitOtherTeam() {
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
        <SBigO />
        <SMatchingText10 />
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

const SBigO = styled(BigO)`
  margin-right: 5%;
`;

const SMatchingText10 = styled(MatchingText10)`
  margin-top: 10%;
`;
