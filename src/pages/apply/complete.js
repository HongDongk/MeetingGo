import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'antd';
import backend from '../../util/backend';
import { createTeam } from '../../features/apply/asyncAction';
import ApplyLayout from '../../layout/ApplyLayout';
import { ReactComponent as BigO } from '../../asset/svg/BigO.svg';
import ChannelTalk from '../../asset/ChannelTalk';

function Complete() {
  const { accessToken } = useSelector((state) => state.user);
  const [userTeamId, setUserTeamId] = useState('');
  const [matchingStatus, setMatchingStatus] = useState('');
  const { finishedStep, ...applydata } = useSelector((store) => store.apply);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInformation = useCallback(async () => {
    const userteamid = await backend.get('/users/team-id');
    const matchingstatus = await backend.get('/users/matchings/status');
    setUserTeamId(userteamid.data.teamId);
    setMatchingStatus(matchingstatus.data.matchingStatus);
  }, []);

  useEffect(() => {
    if (!accessToken) {
      window.alert('잘못된 접근입니다');
      navigate('/');
    }
    getInformation();
  }, []);

  const handleSubmitData = useCallback(async () => {
    if (matchingStatus === 'APPLIED') {
      try {
        await backend.patch(`/teams/${userTeamId}`, applydata);
        window.alert('수정되었습니다!');
      } catch (e) {
        window.alert('수정중 오류가 발생하였습니다');
      }
    } else if (matchingStatus === null) {
      dispatch(createTeam(applydata));
      window.alert('저장되었습니다!');
    } else {
      await backend.delete(`/teams/${userTeamId}`);
      dispatch(createTeam(applydata));
      window.alert('저장되었습니다!');
    }
    navigate('/matching');
  });

  return (
    <ApplyLayout>
      <Container>
        <SBigO />
        <TextBox>
          <BlackText>저장하기 버튼을 누르면</BlackText>
          <BlackText>미팅 신청이 완료돼요!</BlackText>
          <BlackText>매칭이 되면 문자를 드릴게요.</BlackText>
        </TextBox>
        <SubmitButton
          onClick={() => {
            handleSubmitData();
          }}
        >
          저장하기
        </SubmitButton>
      </Container>
      <div>{ChannelTalk.hideChannelButton()}</div>
    </ApplyLayout>
  );
}

export default Complete;

const Container = styled.div`
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const SBigO = styled(BigO)`
  margin-right: 5%;
`;

const TextBox = styled.div`
  margin-top: 8%;
  width: 100%;
  text-align: center;
`;

const BlackText = styled.div`
  color: black;
  font-size: 35px;
  font-family: 'Nanum JungHagSaeng';
`;

const SubmitButton = styled(Button)`
  font-family: 'Nanum JungHagSaeng';
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  border: none;
  margin-top: 25px;
  width: 100%;
  height: 50px;
  background: #eb8888;
  border-radius: 10px;
`;
