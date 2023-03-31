import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import theme from '../../style/theme';
import ApplyLayout from '../../layout/ApplyLayout';
import { ReactComponent as Baloon } from '../../asset/svg/Baloon.svg';
import ApplyButton from '../../components/ApplyButton';
import ProgressBar from '../../components/ProgressBar';
import { submitStep4 } from '../../features/apply';
import NotEnoughIntroModal from '../../components/Modal/NotEnoughInroModal';
import ChannelTalk from '../../asset/ChannelTalk';

function Apply4Page() {
  const [openModal, setOpenModal] = useState(false);
  const { finishedStep, intro } = useSelector((store) => store.apply);
  const [introduce, setIntroduce] = useState(intro);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (finishedStep < 3) {
      window.alert('잘못된 접근입니다');
      navigate(`/apply/${finishedStep + 1}`);
    }
  }, [finishedStep]);

  const handleChange = useCallback((e) => {
    setIntroduce(e.target.value);
  }, []);

  const handleBefore = useCallback(() => {
    navigate('/apply/3');
  });

  const handleSubmit = useCallback(() => {
    if (introduce.length < 10) {
      setOpenModal(true);
      return;
    }
    dispatch(
      submitStep4({
        intro: introduce,
      }),
    );
    navigate('/apply/5');
  });

  const setModal = (bool) => {
    setOpenModal(bool);
  };

  return (
    <ApplyLayout>
      <NotEnoughIntroModal open={openModal} setModal={setModal} />
      <ProgressBar page={4} />
      <Title>
        <Maintitle>
          우리팀을 소개하는 <Pink>마지막 한 줄 어필</Pink>
        </Maintitle>
        <Subtitle>센스 넘치게 우리 팀을 소개할수록 매칭률이 올라가요!</Subtitle>
        <Subtitle>길게 쓰면 운명의 짝을 만날지도?</Subtitle>
      </Title>
      <Text>
        <Alert>최소 글자수 10자</Alert>
        <STextArea
          value={introduce}
          bordered={false}
          style={{
            height: '150px',
            resize: 'none',
            padding: '25px',
          }}
          showCount
          minLength={10}
          maxLength={150}
          onChange={handleChange}
          placeholder="안녕하세요. 한국대학교 손석구, 최준, 뷔입니다!
          최강의 조합 3인방과 함께라면 그 날은 꿀잼 보장.
          만약 재미없다면 집까지 앞구르기 하면서 가겠습니다.
          (아, 참고로 잘생겼습니다^^)"
        />
      </Text>
      <SBaloon>
        <Baloon />
      </SBaloon>
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

export default Apply4Page;

const Title = styled.div`
  width: 90%;
  margin-top: 8%;
  height: 13%;
  min-height: 13%;
`;

const Maintitle = styled.div`
  width: 100%;
  font-family: 'Nanum JungHagSaeng';
  font-weight: 400;
  font-size: 35px;
`;

const Pink = styled.div`
  padding-bottom: 5%;
  color: ${theme.pink};
`;

const Subtitle = styled.p`
  margin-top: 2%;
  color: #aaaaaa;
  font-weight: 400;
  font-size: 13px;
`;
const Text = styled.div`
  margin-top: 20%;
  padding-bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;
const STextArea = styled(Input.TextArea)`
  background-color: white;
  width: 90%;
  border: 1px solid #f1ecec;
  border-radius: 10px;
`;

const Alert = styled.p`
  z-index: 1;
  position: absolute;
  top: 8%;
  right: 10%;
  color: #aaaaaa;
  font-weight: 400;
  font-size: 10px;
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

const SBaloon = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;
