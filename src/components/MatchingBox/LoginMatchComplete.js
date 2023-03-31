import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { DateObject } from 'react-multi-date-picker';
import SelectCalendarModal from '../Modal/SelectCalendarModal';
import { ReactComponent as ProcessBar4 } from '../../asset/svg/ProcessBar4.svg';
import { ReactComponent as Meetinge } from '../../asset/svg/RainBowMeetinge.svg';
import { ReactComponent as CircleArrow } from '../../asset/svg/CircleArrow.svg';
import { ReactComponent as RightArrow } from '../../asset/svg/RightArrow.svg';
import { ReactComponent as MatchingText7 } from '../../asset/svg/MatchingText7.svg';

// 로그인하고 매칭증에 둘다수락했을때 매칭조회페이지

export default function LoginMatchComplete() {
  const { finishedStep, availableDates } = useSelector((store) => store.apply);
  const [openSelectCalendarModal, setOpenSelectCalendarModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    setOpenModal(false);
  };

  const setSelectCalendarModal = (bool) => {
    setOpenSelectCalendarModal(bool);
  };

  return (
    <>
      <SelectCalendarModal
        open={openSelectCalendarModal}
        setModal={setSelectCalendarModal}
      />
      <Modal
        width="380px"
        open={openModal}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <Container>
          <ModalText1>새로운 미팅을 신청하러 가시겠어요?</ModalText1>
          <ModalText2>지금 수락된 미팅은 그대로 진행됩니다.</ModalText2>
          <SButton
            onClick={() => {
              const selectedDate = availableDates
                .map((d) => new DateObject(d))
                .filter((d) => d.format() >= new DateObject().format());
              // 기존 신청 정보가 없는 경우
              if (finishedStep < 5) {
                window.alert('잘못된 접근입니다');
                navigate(`/apply/${finishedStep + 1}`);
              }
              // 가능한 날짜가 4일 미만인 경우
              else if (selectedDate.length < 4) {
                setSelectCalendarModal(true);
              } else {
                navigate('/apply/6');
              }
              setOpenModal(false);
            }}
          >
            기존 정보로 매칭 시작하기
          </SButton>
          <SButton2
            onClick={() => {
              navigate('/apply/1');
              window.localStorage.removeItem('apply-data');
              setOpenModal(false);
            }}
          >
            새로 정보 입력하기
          </SButton2>
        </Container>
      </Modal>
      <Content>
        <ProcessBar4 />
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
          <SMatchingText7 />
          <MeetingButton
            onClick={() => {
              navigate('/matching/otherteam');
            }}
          >
            상대팀 프로필 조회하기
          </MeetingButton>
        </WhiteBox>
        <WhiteBox2
          onClick={() => {
            setOpenModal(true);
          }}
        >
          한번 더 미팅하러 가기 <RightArrow />
        </WhiteBox2>
      </Content>
    </>
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
  padding: 25px 0;
  background: #ffffff;
  border-radius: 10px;
`;

const WhiteBox2 = styled.div`
  width: 264px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
  padding: 20px 35px;
  background: #ffffff;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #777777;
  &:hover {
    cursor: pointer;
  }
`;

const SMatchingText7 = styled(MatchingText7)`
  margin-top: 5%;
`;

const MeetingButton = styled(Button)`
  font-family: 'Nanum JungHagSaeng';
  color: #ffffff;
  font-weight: 400;
  font-size: 23px;
  text-align: center;
  border: none;
  margin-top: 7%;
  width: 160px;
  height: 50px;
  background: #eb8888;
  border-radius: 10px;
`;

const Container = styled.div`
  padding-top: 5%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModalText1 = styled.div`
  margin-top: 3%;
  text-align: center;
  width: 210px;
`;

const ModalText2 = styled.div`
  text-align: center;
  width: 220px;
`;

const SButton = styled(Button)`
  margin-top: 10%;
  width: 60%;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.pink};
`;

const SButton2 = styled(Button)`
  margin-top: 3%;
  width: 60%;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.pink};
`;
