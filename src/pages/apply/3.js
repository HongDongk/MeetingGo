import styled from 'styled-components';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import theme from '../../style/theme';
import ApplyLayout from '../../layout/ApplyLayout';
import Teambox from '../../components/Teambox';
import ApplyButton from '../../components/ApplyButton';
import ProgressBar from '../../components/ProgressBar';
import IsPageCompleteModal from '../../components/Modal/IsPageCompleteModal';
import { submitStep3 } from '../../features/apply';
import ChannelTalk from '../../asset/ChannelTalk';

function Apply3Page() {
  const [openModal, setOpenModal] = useState(false);
  const { finishedStep, members, memberCount } = useSelector(
    (store) => store.apply,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [member1, setMember1] = useState(members[0] || {});
  const [member2, setMember2] = useState(members[1] || {});
  const [member3, setMember3] = useState(members[2] || {});

  useEffect(() => {
    if (finishedStep < 2) {
      window.alert('잘못된 접근입니다');
      navigate(`/apply/${finishedStep + 1}`);
    }
  }, [finishedStep]);

  const setModal = (bool) => {
    setOpenModal(bool);
  };

  const handleBefore = useCallback(() => {
    navigate('/apply/2');
  });

  const handleSubmit = useCallback(() => {
    if (memberCount === 2) {
      if (
        !member1.age ||
        !member1.role ||
        !member1.mbti ||
        !member2.age ||
        !member2.role ||
        !member2.mbti
      ) {
        setOpenModal(true);
      } else {
        dispatch(
          submitStep3({
            members: [member1, member2],
          }),
        );
        navigate('/apply/4');
      }
    } else if (
      !member1.age ||
      !member1.role ||
      !member1.mbti ||
      !member2.age ||
      !member2.role ||
      !member2.mbti ||
      !member3.age ||
      !member3.role ||
      !member3.mbti
    ) {
      setOpenModal(true);
    } else {
      dispatch(
        submitStep3({
          members: [member1, member2, member3],
        }),
      );
      navigate('/apply/4');
    }
  });

  const teamboxcount = useMemo(() => {
    if (memberCount === 2) {
      return (
        <>
          <Teambox member={member1} setMember={setMember1} name="대표자" />
          <Teambox member={member2} setMember={setMember2} name="팀원 1" />
        </>
      );
    }
    if (memberCount === 3) {
      return (
        <>
          <Teambox member={member1} setMember={setMember1} name="대표자" />
          <Teambox member={member2} setMember={setMember2} name="팀원 2" />
          <Teambox member={member3} setMember={setMember3} name="팀원 3" />
        </>
      );
    }
    return null;
  });

  return (
    <ApplyLayout>
      <IsPageCompleteModal open={openModal} setModal={setModal} />
      <ProgressBar page={3} />
      <Title>
        <Maintitle>
          <Pink>우리팀의 구성원</Pink>을 소개해 주세요!
        </Maintitle>
        <Subtitle>나와 팀원들의 개별 ID카드를 완성해 주세요</Subtitle>
      </Title>
      {teamboxcount}
      <Footer>
        <ButtonBox>
          <ApplyButton onClick={handleBefore}>이전</ApplyButton>
          <ApplyButton onClick={handleSubmit}>다음</ApplyButton>
        </ButtonBox>
      </Footer>
      <div>{ChannelTalk.hideChannelButton()}</div>
    </ApplyLayout>
  );
}

export default Apply3Page;

const Title = styled.div`
  width: 90%;
  margin-top: 8%;
  height: 10%;
`;

const Maintitle = styled.div`
  width: 100%;
  font-family: 'Nanum JungHagSaeng';
  font-weight: 400;
  font-size: 35px;
`;

const Pink = styled.span`
  color: ${theme.pink};
`;

const Subtitle = styled.p`
  margin-top: 4%;
  color: #aaaaaa;
  font-weight: 400;
  font-size: 13px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10%;
  padding-bottom: 5%;
`;

const ButtonBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  justify-content: space-between;
  margin-top: 5%;
`;
