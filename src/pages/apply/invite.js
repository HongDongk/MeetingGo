import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input } from 'antd';
import backend from '../../util/backend';
import ApplyLayout from '../../layout/ApplyLayout';
import ChannelTalk from '../../asset/ChannelTalk';

function InvitePage() {
  const referralId = sessionStorage.getItem('referralId');
  const [inviteCode, setInviteCode] = useState(referralId);
  const navigate = useNavigate();

  const handleInviteCode = useCallback(
    (e) => {
      setInviteCode(e.target.value);
    },
    [inviteCode],
  );
  const NextPage = useCallback(async () => {
    if (inviteCode !== null) {
      try {
        await backend.post('/invitations', { referralId: inviteCode });
        navigate('/');
      } catch (e) {
        window.alert('초대코드가 올바르지않습니다!');
      }
    } else {
      navigate('/');
    }
  });

  console.log(referralId);

  return (
    <ApplyLayout>
      <Title>
        <Maintitle>혹시 미팅학개론에 초대해주신 회원이 있나요?</Maintitle>
        <Subtitle>회원 초대 코드가 있다면 알려주세요</Subtitle>
      </Title>
      <Conatiner>
        <SInput
          value={inviteCode}
          onChange={handleInviteCode}
          placeholder="회원코드 입력하기 (선택)"
        />
      </Conatiner>
      <Footer>
        <SubmitButton onClick={NextPage}>미팅 시작하기</SubmitButton>
      </Footer>
      <div>{ChannelTalk.hideChannelButton()}</div>
    </ApplyLayout>
  );
}

export default InvitePage;

const Title = styled.div`
  width: 90%;
  margin-top: 50%;
  height: 13%;
  min-height: 13%;
`;

const Maintitle = styled.div`
  width: 95%;
  font-family: 'Nanum JungHagSaeng';
  font-weight: 400;
  font-size: 35px;
`;

const Subtitle = styled.p`
  margin-top: 4%;
  color: #aaaaaa;
  font-weight: 400;
  font-size: 13px;
`;

const Conatiner = styled.div`
  margin-top: 50px;
  margin-bottom: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const SInput = styled(Input)`
  margin-top: 7%;
  width: 100%;
  height: 48px;
`;

const SubmitButton = styled(Button)`
  margin-top: 5%;
  font-family: 'Nanum JungHagSaeng';
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  border: none;
  width: 100%;
  height: 50px;
  background: #eb8888;
  border-radius: 10px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-bottom: 50%;
`;
