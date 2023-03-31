import styled from 'styled-components';

import { ReactComponent as BigO } from '../../asset/svg/BigO.svg';
import { ReactComponent as ProcessBar1 } from '../../asset/svg/ProcessBar1.svg';
import { ReactComponent as MatchingText1 } from '../../asset/svg/MatchingText1.svg';

// 로그인안했을 때 매칭조회페이지

export default function NoLogin() {
  return (
    <Content>
      <ProcessBar1 />
      <WhiteBox>
        <SBigO />
        <SMatchingText1 />
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

const WhiteBox = styled.div`
  width: 334px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  padding: 40px 0;
  background: #ffffff;
  border-radius: 10px;
`;

const SBigO = styled(BigO)`
  margin-right: 5%;
`;

const SMatchingText1 = styled(MatchingText1)`
  margin-top: 20%;
`;
