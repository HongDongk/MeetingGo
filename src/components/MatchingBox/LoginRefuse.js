// 로그인하고 매칭증에 자신이 거절했을 때 매칭조회페이지

import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from 'antd';
import backend from '../../util/backend';
import ChooseButton from '../ChooseButton';

export default function LoginRefuse({ teamId }) {
  const [matchingId, setMatchingId] = useState('');
  const [refuseReason, setRefuseReason] = useState([]);
  const [personalReason, setPersonalReason] = useState('');
  const navigate = useNavigate();
  const getMatchingId = useCallback(async () => {
    const teamid = await backend.get(`/users/team-id`);
    const matchingid = await backend.get(
      `/teams/${teamid.data.teamId}/matching-id`,
    );
    setMatchingId(matchingid.data.matchingId);
  }, []);

  useEffect(() => {
    getMatchingId();
  }, []);

  const handleRefuseReason = useCallback(
    (val, isChecked) => {
      if (isChecked) {
        setRefuseReason([...refuseReason, val]);
        return;
      }
      setRefuseReason(refuseReason.filter((v) => v !== val));
    },
    [refuseReason],
  );

  const handlePersonalReason = useCallback(
    (e) => {
      setPersonalReason(e.target.value);
    },
    [personalReason],
  );

  const handleSubmit = useCallback(async () => {
    await backend.patch(
      `/matchings/${matchingId}/teams/${teamId}/refuse-reason`,
      {
        reason1: refuseReason.includes(1),
        reason2: refuseReason.includes(2),
        reason3: refuseReason.includes(3),
        other: personalReason,
      },
    );
    navigate('/matching');
  }, [refuseReason, personalReason]);
  return (
    <WhiteBox>
      <TextBox>거절하신 이유가 뭘까요?</TextBox>
      <ChooseBox>
        <ChooseButton
          isActive={refuseReason.includes(1)}
          onChange={(isActive) => handleRefuseReason(1, isActive)}
          content="학교가 마음에 들지 않아요"
        />
        <ChooseButton
          isActive={refuseReason.includes(2)}
          onChange={(isActive) => handleRefuseReason(2, isActive)}
          content="한 줄 소개가 마음에 들지 않아요"
        />
        <ChooseButton
          isActive={refuseReason.includes(3)}
          onChange={(isActive) => handleRefuseReason(3, isActive)}
          content="우리 팀 내부 사정이 생겼어요"
        />
        <ChooseButtonLast>
          <ChooseInput
            value={personalReason}
            maxLength={10}
            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기타(직접 작성해 주세요)"
            onChange={handlePersonalReason}
            autoComplete="off"
          />
        </ChooseButtonLast>
      </ChooseBox>
      <MeetingButton
        onClick={() => {
          handleSubmit();
        }}
      >
        결과 보내기
      </MeetingButton>
    </WhiteBox>
  );
}

const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  padding: 40px 22px 70px 22px;
  background: #ffffff;
  border-radius: 10px;
`;

const TextBox = styled.div`
  margin-top: 20%;
  text-align: center;
  width: 100%;
  color: #1a1a1a;
  font-weight: 400;
  font-size: 30px;
  font-family: 'Nanum JungHagSaeng';
`;

const ChooseBox = styled.div`
  margin-top: 7%;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const ChooseButtonLast = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff8f8;
  border-radius: 10px;
  margin-top: 5%;
  width: 100%;
  height: 45px;
  padding: 5px 0;
`;

const ChooseInput = styled(Input)`
  width: 90%;
  height: 35px;
  border: none;
  background: #fff8f8;
`;

const MeetingButton = styled(Button)`
  font-family: 'Nanum JungHagSaeng';
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  border: none;
  margin-top: 15%;
  width: 160px;
  height: 50px;
  background: #eb8888;
  border-radius: 10px;
`;
