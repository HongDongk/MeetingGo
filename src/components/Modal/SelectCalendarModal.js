import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { submitDate } from '../../features/apply';
import theme from '../../style/theme';
import NotEnoughDateModal from './NotEnoughDateModal';

export default function SelectCalendarModal({ open, setModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { availableDates } = useSelector((store) => store.apply);
  const [selectDate, setSelectDate] = useState(
    availableDates
      .map((d) => new DateObject(d))
      .filter((d) => d.format() >= new DateObject().format()), // 오늘 이상 날짜만 선택
  );
  const [openNotEnoughDateModal, setOpenNotEnoughDateModal] = useState(false);

  const handleCancel = () => {
    setModal(false);
  };

  const setNotEnoughDateModal = (bool) => {
    setOpenNotEnoughDateModal(bool);
  };

  const handleSubmit = useCallback(() => {
    if (selectDate.length < 4) {
      setNotEnoughDateModal(true);
      return;
    }

    dispatch(
      submitDate({
        availableDates: [...selectDate.map((a) => a.format()).sort()], // 오름차순 정렬
      }),
    );
    navigate('/apply/6');
  });

  return (
    <div>
      <NotEnoughDateModal
        open={openNotEnoughDateModal}
        setModal={setNotEnoughDateModal}
      />
      {open ? (
        <Modal
          open={open}
          footer={null}
          centered
          width="380px"
          onCancel={handleCancel}
        >
          <Container>
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
            <SButton onClick={handleSubmit}>다음</SButton>
          </Container>
        </Modal>
      ) : null}
    </div>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SButton = styled(Button)`
  font-weight: 400;
  font-size: 24px;
  font-family: 'Nanum JungHagSaeng';
  display: flex;
  justify-content: center;
  width: 80%;
  height: 50px;
  margin-top: 5%;
  margin-bottom: 5%;
  color: white;
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.lightPink};
  color: ${(props) => props.theme.lightPink};
  &:hover {
    background-color: ${(props) => props.theme.pink};
    color: white;
  }
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
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

const Subtitle = styled.p`
  margin-top: 4%;
  color: #aaaaaa;
  font-weight: 400;
  font-size: 13px;
`;

const Pink = styled.span`
  color: ${theme.pink};
`;

const CalendarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
