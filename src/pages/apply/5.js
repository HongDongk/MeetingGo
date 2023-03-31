import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Slider } from 'antd';
import BinaryButton from '../../components/BinaryButton';
import theme from '../../style/theme';
import ApplyLayout from '../../layout/ApplyLayout';
import ApplyButton from '../../components/ApplyButton';
import ProgressBar from '../../components/ProgressBar';
import { ReactComponent as Bottom } from '../../asset/svg/Apply5Bottom.svg';
import ChooseButton from '../../components/ChooseButton';
import { submitStep5 } from '../../features/apply';
import IsPageCompleteModal from '../../components/Modal/IsPageCompleteModal';
import ChannelTalk from '../../asset/ChannelTalk';

function Apply5Page() {
  const [openModal, setOpenModal] = useState(false);
  const { finishedStep, prefAge, prefSameUniversity, prefVibes, drink } =
    useSelector((store) => store.apply);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (finishedStep < 4) {
      window.alert('잘못된 접근입니다');
      navigate(`/apply/${finishedStep + 1}`);
    }
  }, [finishedStep]);

  const marks = {
    20: { label: <SliderText>20</SliderText> },
    21: { label: <SliderText>21</SliderText> },
    22: { label: <SliderText>22</SliderText> },
    23: { label: <SliderText>23</SliderText> },
    24: { label: <SliderText>24</SliderText> },
    25: { label: <SliderText>25</SliderText> },
    26: { label: <SliderText>26</SliderText> },
    27: { label: <SliderText>27</SliderText> },
    28: { label: <SliderText>28</SliderText> },
    29: { label: <SliderText>29</SliderText> },
  };
  const marks2 = {
    1: { label: <SliderText>Level 1</SliderText> },
    2: { label: <SliderText>2</SliderText> },
    3: { label: <SliderText>3</SliderText> },
    4: { label: <SliderText>4</SliderText> },
    5: { label: <SliderText>5</SliderText> },
  };

  const trackStyle = {
    backgroundColor: '#EB8888',
  };

  const [ageRange, setAgeRange] = useState(prefAge.length ? prefAge : [23, 25]);
  const [sameSchool, setSameSchool] = useState(prefSameUniversity);
  const [prefMood, setPrefMood] = useState(prefVibes);
  const [alchol, setAlchol] = useState(drink);

  const setModal = (bool) => {
    setOpenModal(bool);
  };

  const onAfterChange = (value) => {
    setAgeRange(value);
  };

  const handleVibe = useCallback(
    (val, isChecked) => {
      if (isChecked) {
        setPrefMood([...prefMood, val]);
        return;
      }
      setPrefMood(prefMood.filter((v) => v !== val));
    },
    [prefMood],
  );

  const handleBefore = useCallback(() => {
    navigate('/apply/4');
  });

  const handleSubmit = useCallback(() => {
    if (prefMood.length === 0) {
      setOpenModal(true);
      return;
    }
    dispatch(
      submitStep5({
        prefAge: ageRange,
        prefSameUniversity: sameSchool,
        prefVibes: prefMood,
        drink: alchol,
      }),
    );
    navigate('/apply/6');
  });

  return (
    <ApplyLayout>
      <IsPageCompleteModal open={openModal} setModal={setModal} />
      <ProgressBar page={5} />
      <Title>
        <Maintitle>
          <Pink>어떤 상대팀</Pink>을 원하시나요?
        </Maintitle>
      </Title>
      <Title2>
        <Maintitle2>평균 나이</Maintitle2>
        <Subtitle2>범위를 넓게 선택해야 매칭 확률이 상승해요</Subtitle2>
      </Title2>
      <SSlider
        onAfterChange={onAfterChange}
        trackStyle={trackStyle}
        tooltip={{ placement: 'top' }}
        marks={marks}
        defaultValue={ageRange}
        max={29}
        min={20}
        range
      />
      <Title2>
        <Maintitle2>상대팀 학교</Maintitle2>
      </Title2>
      <ChooseBox>
        <BinaryButton
          state={sameSchool}
          condition1="상관없음"
          condition2="같은 학교는 싫어요"
          onChange={(result) =>
            result ? setSameSchool(true) : setSameSchool(false)
          }
        />
      </ChooseBox>
      <Title>
        <Maintitle>
          <Pink>미팅</Pink>은 어땠으면 좋겠어요?
        </Maintitle>
      </Title>
      <Title2>
        <Maintitle2>분위기</Maintitle2>
        <Subtitle>중복 선택이 가능해요</Subtitle>
      </Title2>
      <ChooseBox2>
        <ChooseButton
          isActive={prefMood.includes(1)}
          onChange={(isActive) => handleVibe(1, isActive)}
          content="코로나 때문에 못한 연애 오늘?!"
        />
        <ChooseButton
          isActive={prefMood.includes(2)}
          onChange={(isActive) => handleVibe(2, isActive)}
          content="친구는 다다익선! 찐친 만들어 보자"
        />
        <ChooseButton
          isActive={prefMood.includes(3)}
          onChange={(isActive) => handleVibe(3, isActive)}
          content="왁자지껄 이 밤이 떠나가라!"
        />
        <ChooseButton
          isActive={prefMood.includes(4)}
          onChange={(isActive) => handleVibe(4, isActive)}
          content="술게임 한 수 배우러 왔습니다"
        />
        <ChooseButton
          isActive={prefMood.includes(5)}
          onChange={(isActive) => handleVibe(5, isActive)}
          content="술게임 못해도 챙겨주는 훈훈한 분위기"
        />
      </ChooseBox2>
      <Title2>
        <Maintitle2>주량 레벨</Maintitle2>
        <Subtitle2>우리팀의 평균 주량을 알려주세요</Subtitle2>
      </Title2>
      <AlcholInfo>
        <AlcholContent>반 병</AlcholContent>
        <AlcholContent>한 병</AlcholContent>
        <AlcholContent>한 병 반</AlcholContent>
        <AlcholContent>두 병</AlcholContent>
        <AlcholContent>술고래</AlcholContent>
      </AlcholInfo>
      <SSlider
        onChange={setAlchol}
        value={alchol}
        trackStyle={trackStyle}
        tooltip={{
          open: false,
        }}
        dots
        marks={marks2}
        max={5}
        min={1}
      />
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

export default Apply5Page;

const Title = styled.div`
  width: 90%;
  margin-top: 8%;
`;
const Title2 = styled.div`
  margin-top: 8%;
  width: 90%;
`;

const Maintitle = styled.div`
  width: 100%;
  font-family: 'Nanum JungHagSaeng';
  font-weight: 400;
  font-size: 35px;
`;

const Maintitle2 = styled.div`
  margin-top: 8%;
  width: 100%;
  height: 10%;
  font-weight: 500;
  font-size: 14px;
  color: #777777;
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

const Subtitle2 = styled.p`
  margin-top: 3%;
  color: #aaaaaa;
  font-weight: 400;
  font-size: 12px;
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

const SSlider = styled(Slider)`
  margin-top: 7%;
  width: 85%;
  .custom-slider .ant-slider-mark-text {
    display: none;
  }
  .custom-slider .ant-slider-mark-text-active {
    display: block;
  }
`;

const SliderText = styled.p`
  font-weight: 400;
  color: #b79292;
  font-size: 16px;
  font-family: 'Nanum JungHagSaeng';
`;

const ChooseBox = styled.div`
  margin-top: 4%;
  width: 90%;
  display: flex;
  justify-content: space-around;
  padding-bottom: 10%;
`;

const ChooseBox2 = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const AlcholInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 14px;
  margin-top: 8%;
  width: 90%;
  color: #eb8888;
`;

const AlcholContent = styled.div`
  text-align: center;
`;

const SBottom = styled(Bottom)`
  margin-left: 57%;
  margin-top: 20%;
`;
