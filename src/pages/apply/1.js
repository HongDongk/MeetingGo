import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import theme from '../../style/theme';
import BinaryButton from '../../components/BinaryButton';
import ApplyLayout from '../../layout/ApplyLayout';
import ApplyButton from '../../components/ApplyButton';
import ProgressBar from '../../components/ProgressBar';
import { ReactComponent as SearchIcon } from '../../asset/svg/SearchIcon.svg';
import { ReactComponent as Bottom } from '../../asset/svg/B.svg';
import { ReactComponent as Xbutton } from '../../asset/svg/Xbutton.svg';
import { submitStep1 } from '../../features/apply';
import IsPageCompleteModal from '../../components/Modal/IsPageCompleteModal';
import Universities from '../../asset/Universities';
import ChannelTalk from '../../asset/ChannelTalk';

export default function Apply1Page() {
  const { accessToken } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const { gender, memberCount, universities } = useSelector(
    (store) => store.apply,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUniversities, setSelectedUniversities] =
    useState(universities);
  const [man, setMan] = useState(gender);
  const [meetingMember, setmeetingMember] = useState(memberCount);
  const [searchKeyWord, setSearchKeyWord] = useState(0);

  useEffect(() => {
    if (!accessToken) {
      window.alert('잘못된 접근입니다');
      navigate('/');
    }
    if (memberCount === 2) {
      localStorage.removeItem('apply-data');
      window.location.reload();
    }
  }, []);

  const countMember = useCallback(() => {
    if (meetingMember === 3) {
      setmeetingMember(null);
    }
    if (meetingMember === null) {
      setmeetingMember(3);
    }
  }, [meetingMember]);

  const SearchedUniv = Universities.filter(
    (c) => c.name.indexOf(searchKeyWord) > -1,
  );

  const inputChange = (e) => {
    setSearchKeyWord(e.target.value);
  };

  const setModal = (bool) => {
    setOpenModal(bool);
  };

  const handleBefore = useCallback(() => {
    navigate('/');
  });

  const handleSubmit = useCallback(() => {
    if (selectedUniversities?.length < 1 || meetingMember === null) {
      setOpenModal(true);
      return;
    }
    dispatch(
      submitStep1({
        gender: man,
        memberCount: meetingMember,
        universities: selectedUniversities,
      }),
    );
    navigate('/apply/2');
  });

  return (
    <ApplyLayout>
      <IsPageCompleteModal open={openModal} setModal={setModal} />
      <ProgressBar page={1} />
      <Title>
        <Maintitle>
          <Pink>기본 정보</Pink>를 알려주세요
        </Maintitle>
      </Title>
      <ChooseBox>
        <ChooseTitle>성별</ChooseTitle>
        <BinaryButton
          state={man === 1}
          condition1="남자"
          condition2="여자"
          onChange={(result) => (result ? setMan(1) : setMan(2))}
        />
      </ChooseBox>
      <ChooseBox2>
        <ChooseTitle>인원 수</ChooseTitle>
        <PeopleCountBox>
          <ThreePeople isActive={meetingMember === 3} onClick={countMember}>
            3:3 미팅
          </ThreePeople>
          <AlertBox> ℹ️ 3:3 미팅 신청만 가능해요!</AlertBox>
        </PeopleCountBox>
        {/* 2:2 미팅선택버튼 */}
        {/* <BinaryButton
          state={meetingMember === 2}
          condition1="2:2 미팅"
          condition2="3:3 미팅"
          onChange={(result) =>
            result ? setmeetingMember(2) : setmeetingMember(3)
          }
        /> */}
      </ChooseBox2>
      <Title>
        <Maintitle>
          <Pink>우리 팀의 학교</Pink>를 알려주세요
        </Maintitle>
        <Subtitle>팀원들의 모든 학교를 말해주세요</Subtitle>
      </Title>
      <CollegeBox>
        <SelectedBox>
          {selectedUniversities
            ? selectedUniversities.map((a) => (
                <SelectedUniversity key={a}>
                  {Universities[a - 1].name}
                  <SXbutton
                    onClick={() => {
                      setSelectedUniversities(
                        selectedUniversities.filter((b) => b !== a),
                      );
                    }}
                  />
                </SelectedUniversity>
              ))
            : null}
        </SelectedBox>
        <SearchBox>
          <SearchInput
            onChange={inputChange}
            name="universitySearch"
            placeholder="학교를 검색해주세요"
            autoComplete="off"
          />
          <SearchIcon />
        </SearchBox>
        <SearchList>
          {SearchedUniv.map((a) => (
            <SearchedUniversity
              key={a.id}
              onClick={() => {
                if (
                  !selectedUniversities.includes(a.id) &&
                  selectedUniversities.length < 3
                )
                  setSelectedUniversities([a.id, ...selectedUniversities]);
              }}
            >
              {a.name}
            </SearchedUniversity>
          ))}
        </SearchList>
      </CollegeBox>
      <SBottom />
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

const ChooseBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 10%;
`;

const ChooseBox2 = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10%;
`;

const ChooseTitle = styled.span`
  padding-bottom: 5%;
  color: #777777;
  font-size: 14px;
  font-weight: 500;
`;

const SBottom = styled(Bottom)`
  margin-left: 57%;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 6%;
  padding-bottom: 5%;
`;

const ButtonBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  justify-content: space-between;
  margin-top: 5%;
`;

const PeopleCountBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ThreePeople = styled.button`
  margin-right: 5px;
  border-radius: 14px;
  height: 40px;
  width: 162px;
  background: ${(props) => (props.isActive ? '#EB8888' : 'F6EEEE')};
  color: ${(props) => (props.isActive ? '#F6EEEE' : '#B79292')};
  border-color: transparent;
  font-family: 'Nanum JungHagSaeng';
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

const AlertBox = styled.div`
  font-family: 'Nanum JungHagSaeng';
  width: 50%;
  font-weight: 400;
  font-size: 20px;
  color: #969696;
`;

const CollegeBox = styled.div`
  margin-top: 5%;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.div`
  margin-top: 5%;
  width: 95%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #eb8888;
  padding: 0 5px 0 5px;
  height: 40px;
`;

const SearchInput = styled.input`
  display: flex;
  width: 90%;
  height: 100%;
  font-size: 20px;
  border: 0;
  outline: none;
  margin-left: 10px;
  background-color: transparent;
  color: #eb8888;
  font-family: Nanum JungHagSaeng;
`;
const SelectedBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const SelectedUniversity = styled.div`
  margin-top: 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 13px;
  color: #ffffff;
  width: 40%;
  height: 45px;
  background: #eb8888;
  border-radius: 10px;
  padding: 0 3%;
`;

const SXbutton = styled(Xbutton)`
  &:hover {
    cursor: pointer;
  }
`;

const SearchList = styled.div`
  margin-left: 2%;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  overflow: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 200px;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const SearchedUniversity = styled.div`
  display: flex;
  min-height: 40px;
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  color: #eb8888;
  font-size: 14px;
  border-bottom: 1px solid #f6eeee;
  overflow-x: hidden;
`;
