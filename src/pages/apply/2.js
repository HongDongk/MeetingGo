import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, DateObject } from 'react-multi-date-picker';
import ChooseButton from '../../components/ChooseButton';
import { submitStep2 } from '../../features/apply';
import theme from '../../style/theme';
import ApplyLayout from '../../layout/ApplyLayout';
import ApplyButton from '../../components/ApplyButton';
import ProgressBar from '../../components/ProgressBar';
import NotEnoughDateModal from '../../components/Modal/NotEnoughDateModal';
import NotEnoughPlaceModal from '../../components/Modal/NotEnoughPlaceModal';
import IsPageCompleteModal from '../../components/Modal/IsPageCompleteModal';
import { ReactComponent as Earth } from '../../asset/svg/Earth.svg';
import ChannelTalk from '../../asset/ChannelTalk';

export default function Apply2() {
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const { finishedStep, availableDates, areas } = useSelector(
    (store) => store.apply,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectDate, setSelectDate] = useState(
    availableDates
      .map((d) => new DateObject(d))
      .filter((d) => d.format() >= new DateObject().format()), // 오늘 이상 날짜만 선택
  );
  const [selectedArea, setSelectedArea] = useState(areas);

  useEffect(() => {
    if (finishedStep < 1) {
      window.alert('잘못된 접근입니다');
      navigate(`/apply/${finishedStep + 1}`);
    }
  }, [finishedStep]);

  const handleArea = useCallback(
    (val, isChecked) => {
      if (isChecked) {
        setSelectedArea([...selectedArea, val]);
        return;
      }
      setSelectedArea(selectedArea.filter((v) => v !== val));
    },
    [selectedArea],
  );

  const setModal1 = (bool) => {
    setOpenModal1(bool);
  };

  const setModal2 = (bool) => {
    setOpenModal2(bool);
  };

  const setModal3 = (bool) => {
    setOpenModal3(bool);
  };

  const handleBefore = useCallback(() => {
    navigate('/apply/1');
  });

  const handleSubmit = useCallback(() => {
    if (selectDate.length < 4 && selectedArea < 1) {
      setOpenModal3(true);
      return;
    }
    if (selectDate.length < 4) {
      setOpenModal1(true);
      return;
    }
    if (selectedArea < 1) {
      setOpenModal2(true);
      return;
    }
    dispatch(
      submitStep2({
        availableDates: [...selectDate.map((a) => a.format()).sort()], // 오름차순 정렬
        areas: selectedArea,
      }),
    );
    navigate('/apply/3');
  });

  return (
    <ApplyLayout>
      <NotEnoughDateModal open={openModal1} setModal={setModal1} />
      <NotEnoughPlaceModal open={openModal2} setModal={setModal2} />
      <IsPageCompleteModal open={openModal3} setModal={setModal3} />
      <ProgressBar page={2} />
      <Title>
        <Maintitle>
          <Pink>미팅 선호 날짜</Pink>를 알려주세요
        </Maintitle>
        <Subtitle> 많이 선택할수록 매칭 확률이 올라가요</Subtitle>
      </Title>
      <ScrollDiv>
        <CalendarDiv>
          <Calendar
            multiple
            format="YYYY-MM-DD"
            hideYear
            minDate={new Date()}
            maxDate={new Date().setDate(new Date().getDate() + 13)}
            layout="mobile"
            value={selectDate}
            onChange={setSelectDate}
          />
        </CalendarDiv>
      </ScrollDiv>
      <Title2>
        <Maintitle>
          <Pink>미팅 선호 지역</Pink>을 알려주세요
        </Maintitle>
        <Subtitle>중복 선택이 가능해요</Subtitle>
      </Title2>
      <ChooseBox>
        <ChooseButton
          isActive={selectedArea?.includes(1)}
          onChange={(isActive) => handleArea(1, isActive)}
          content="강남"
        />
        <ChooseButton
          isActive={selectedArea?.includes(2)}
          onChange={(isActive) => handleArea(2, isActive)}
          content="건대"
        />
        <ChooseButton
          isActive={selectedArea?.includes(3)}
          onChange={(isActive) => handleArea(3, isActive)}
          content="신촌"
        />
        <ChooseButton
          isActive={selectedArea?.includes(4)}
          onChange={(isActive) => handleArea(4, isActive)}
          content="홍대"
        />
        <ChooseButton
          isActive={selectedArea?.includes(5)}
          onChange={(isActive) => handleArea(5, isActive)}
          content="상관없음"
        />
      </ChooseBox>
      <SEarth />
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

const Title = styled.div`
  width: 90%;
  margin-top: 8%;
  height: 13%;
  min-height: 13%;
`;

const Title2 = styled.div`
  width: 90%;
  margin-top: 15%;
  height: 10%;
  min-height: 13%;
`;

const Maintitle = styled.div`
  width: 100%;
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

const Pink = styled.span`
  color: ${theme.pink};
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

const ChooseBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const CalendarDiv = styled.div`
  padding-left: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  .custom-calendar.rmdp-shadow {
    box-shadow: none;
  }
  .custom-calendar.rmdp-wrapper {
    border: 1px solid #f49393;
    border-radius: 10px;
  }
  .rmdp-arrow {
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    height: 3px;
    margin-top: 5px;
    padding: 2px;
    width: 3px;
  }
  .rmdp-week-day {
    color: black;
    cursor: default;
    font-size: 12px;
    font-weight: 400;
  }
  .rmdp-day.rmdp-selected span:not(.highlight) {
    background-color: #f49393;
    box-shadow: 0 0 3px #8798ad;
    color: #fff;
  }
`;

const ScrollDiv = styled.div`
  width: 90%;
  align-items: flex-start;
  margin-top: 3%;
`;

const SEarth = styled(Earth)`
  margin-top: 20%;
  margin-left: 15%;
`;
