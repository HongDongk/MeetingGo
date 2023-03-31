// 로그인하고 매칭증에 무응답일 때 매칭조회페이지

import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { DateObject } from 'react-multi-date-picker';
import SelectCalendarModal from '../Modal/SelectCalendarModal';
import backend from '../../util/backend';
import { ReactComponent as ProcessBar1 } from '../../asset/svg/ProcessBar1.svg';
import { ReactComponent as SadFace } from '../../asset/svg/SadFace.svg';
import { ReactComponent as RightArrow } from '../../asset/svg/RightArrow.svg';
import { ReactComponent as CircleArrow } from '../../asset/svg/CircleArrow.svg';
import { ReactComponent as MatchingText6 } from '../../asset/svg/MatchingText6.svg';

export default function LoginNoAnswer({ teamId }) {
  const { finishedStep, availableDates } = useSelector((store) => store.apply);
  const [openSelectCalendarModal, setOpenSelectCalendarModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const navigate = useNavigate();

  const handleCancel1 = () => {
    setOpenModal1(false);
  };

  const handleCancel2 = () => {
    setOpenModal2(false);
  };

  const deleteMatching = useCallback(async () => {
    try {
      await backend.delete(`/teams/${teamId}`);
      window.localStorage.removeItem('apply-data');
      window.alert('취소되었습니다');
    } catch (e) {
      console.error(e);
      window.alert('취소중 오류가 발생하였습니다');
    }
  });

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
        open={openModal1}
        onCancel={handleCancel1}
        centered
        footer={null}
      >
        <Container>
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
              setOpenModal1(false);
            }}
          >
            기존 정보로 재매칭
          </SButton>
          <SButton2
            onClick={() => {
              navigate('/apply/1');
              window.localStorage.removeItem('apply-data');
              setOpenModal1(false);
            }}
          >
            새로운 정보로 재매칭
          </SButton2>
        </Container>
      </Modal>

      <Modal
        width="380px"
        open={openModal2}
        onCancel={handleCancel2}
        centered
        footer={null}
      >
        <Container>
          <ModalText2>
            매칭을 중단하시면 입력하신 정보가 사라집니다. 정말 매칭을
            중단하시겠어요?
          </ModalText2>
          <SButton
            onClick={() => {
              setOpenModal2(false);
              deleteMatching();
            }}
          >
            중단하기
          </SButton>
        </Container>
      </Modal>
      <Content>
        <ProcessBar1 />
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
          <SSadFace />
          <SMatchingText6 />
          <MeetingButton
            onClick={() => {
              setOpenModal1(true);
            }}
          >
            재매칭하기
          </MeetingButton>
        </WhiteBox>
        <WhiteBox2>
          <MenuItem
            onClick={() => {
              setOpenModal2(true);
            }}
          >
            매칭 중단하기 <RightArrow />
          </MenuItem>
          <Line />
          <MenuItem
            onClick={() => {
              navigate('/myinfo/ticket');
            }}
          >
            이용권 구매하러 가기 <RightArrow />
          </MenuItem>
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

const SSadFace = styled(SadFace)`
  margin-right: 5%;
  margin-top: 5%;
`;

const SMatchingText6 = styled(MatchingText6)`
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

const WhiteBox2 = styled.div`
  width: 334px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  background: #ffffff;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #777777;
  &:hover {
    cursor: pointer;
  }
`;

const MenuItem = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: #ffffff;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #777777;
  &:hover {
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 85%;
  border: 2px solid #f8f3f3;
  background: #f8f3f3;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModalText2 = styled.div`
  margin-top: 3%;
  text-align: center;
  width: 275px;
`;

const SButton = styled(Button)`
  margin-top: 10%;
  width: 60%;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.pink};
`;

const SButton2 = styled(Button)`
  margin-top: 5%;
  width: 60%;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.pink};
`;
