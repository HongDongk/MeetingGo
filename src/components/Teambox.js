import styled from 'styled-components';
import { useCallback, useMemo, useState, useEffect } from 'react';

import { Select, Modal, Input } from 'antd';
import theme from '../style/theme';
import Mbti from '../asset/Mbti';
import { ReactComponent as Plus } from '../asset/svg/Plus.svg';
import { ReactComponent as Search } from '../asset/svg/Search.svg';
import { ReactComponent as Question } from '../asset/svg/Question.svg';
import { ReactComponent as Profile1 } from '../asset/svg/Profile1.svg';
import { ReactComponent as Profile2 } from '../asset/svg/Profile2.svg';
import { ReactComponent as Profile3 } from '../asset/svg/Profile3.svg';
import { ReactComponent as Profile4 } from '../asset/svg/Profile4.svg';

function Teambox({ member, setMember, name }) {
  const { Option } = Select;

  const [role, setRole] = useState(member.role);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  useEffect(() => {
    if (Object.keys(member).length === 0 && name === '대표자') {
      setMember({ ...member, role: 1 });
      setRole(1);
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelPlus1 = useCallback(() => {
    setMember({ ...member, role: 1 });
    setRole(1);
  }, [member]);

  const handleCancelPlus2 = useCallback(() => {
    setMember({ ...member, role: 2 });
    setRole(2);
  }, [member]);

  const handleCancelPlus3 = useCallback(() => {
    setMember({ ...member, role: 3 });
    setRole(3);
  }, [member]);

  const handleCancelPlus4 = useCallback(() => {
    setMember({ ...member, role: 4 });
    setRole(4);
  }, [member]);

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const [s, setS] = useState(member.appearance);

  const handleAgeChange = useCallback(
    (value) => {
      setMember({ ...member, age: parseInt(value) });
    },
    [member],
  );

  const handleMbtiChange = useCallback(
    (value) => {
      setMember({ ...member, mbti: parseInt(value) });
    },
    [member],
  );

  const handleSimilarChange = useCallback(
    (e) => {
      setS(e.target.value);
    },
    [member],
  );

  const profileimg = useMemo(() => {
    if (role === 1) {
      return <Profile1 />;
    }
    if (role === 2) {
      return <Profile4 />;
    }
    if (role === 3) {
      return <Profile3 />;
    }
    if (role === 4) {
      return <Profile2 />;
    }
    return <Plus />;
  });

  return (
    <Container>
      <Title>{name} ID Card &nbsp;&nbsp;&nbsp;</Title>
      <LeftBox>
        <Profile onClick={showModal}>{profileimg}</Profile>
        <SModal
          footer={null}
          title="포지션 선택"
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <ModalTitle>나는 미팅에서 어떤 포지션?</ModalTitle>
          <Position>
            <WhiteBox
              onClick={() => {
                handleCancel();
                handleCancelPlus1();
              }}
            >
              <WhiteBoxPf>
                <Profile1 />
              </WhiteBoxPf>
              <Ttitle>존재만으로도 분위기를 녹이는 당신!</Ttitle>
              <Ttitle>바라만 보고 있어도 웃음이 나요</Ttitle>
            </WhiteBox>
            <BottomBox>
              <Btitle>주의!</Btitle>
              <BsubTitle>반드시 주위에 물어볼 것!</BsubTitle>
            </BottomBox>
          </Position>
          <Position>
            <WhiteBox
              onClick={() => {
                handleCancel();
                handleCancelPlus2();
              }}
            >
              <WhiteBoxPf>
                <Profile4 />
              </WhiteBoxPf>
              <Ttitle>어색한 분위기를 풀어주는 당신은 미팅의 유재석!</Ttitle>
              <Ttitle>당신이 없다면 미팅이 진행되지 않아요</Ttitle>
            </WhiteBox>
            <BottomBox>
              <Btitle>주의!</Btitle>
              <BsubTitle>진행만 하다가 숨겨진 인연을 놓칠 수 있어요!</BsubTitle>
            </BottomBox>
          </Position>
          <Position>
            <WhiteBox
              onClick={() => {
                handleCancel();
                handleCancelPlus3();
              }}
            >
              <WhiteBoxPf>
                <Profile3 />
              </WhiteBoxPf>
              <Ttitle>리액션과 개그맨 뺨치는 입담으로</Ttitle>
              <Ttitle>상대방을 홀리는 당신!</Ttitle>
            </WhiteBox>
            <BottomBox>
              <Btitle>주의!</Btitle>
              <BsubTitle>개그만 하다 집에 돌아올수도 있으니</BsubTitle>
              <BsubTitle>적절한 타이밍이 중요해요!</BsubTitle>
            </BottomBox>
          </Position>
          <Position>
            <WhiteBox
              onClick={() => {
                handleCancel();
                handleCancelPlus4();
              }}
            >
              <WhiteBoxPf>
                <Profile2 />
              </WhiteBoxPf>
              <Ttitle>수줍음이 많은 당신</Ttitle>
              <Ttitle>순수한 매력에 상대방이 반할지도?</Ttitle>
            </WhiteBox>
            <BottomBox>
              <Btitle>주의!</Btitle>
              <BsubTitle>좀더 자신감을 가지고 강하게 어필해봅시다!</BsubTitle>
            </BottomBox>
          </Position>
        </SModal>
        <ProfileTitle>{name}</ProfileTitle>
      </LeftBox>
      <RightBox>
        <Info>
          <BigTitle>나이</BigTitle>
          <SSelect
            defaultValue={member.age}
            showSearch={false}
            bordered={false}
            removeIcon
            showArrow={false}
            onChange={handleAgeChange}
          >
            <Option value="19">19세</Option>
            <Option value="20">20세</Option>
            <Option value="21">21세</Option>
            <Option value="22">22세</Option>
            <Option value="23">23세</Option>
            <Option value="24">24세</Option>
            <Option value="25">25세</Option>
            <Option value="26">26세</Option>
            <Option value="27">27세</Option>
            <Option value="28">28세</Option>
            <Option value="29">29세</Option>
          </SSelect>
        </Info>
        <Info>
          <BigTitle>MBTI</BigTitle>
          <SSelect
            defaultValue={Mbti[member.mbti - 1]?.name}
            showSearch={false}
            bordered={false}
            optionFilterProp="children"
            suffixIcon={<SSearch />}
            onChange={handleMbtiChange}
          >
            <Option value="1">ENFJ</Option>
            <Option value="2">ENFP</Option>
            <Option value="3">ENTJ</Option>
            <Option value="4">ENTP</Option>
            <Option value="5">ESFJ</Option>
            <Option value="6">ESFP</Option>
            <Option value="7">ESTJ</Option>
            <Option value="8">ESTP</Option>
            <Option value="9">INFJ</Option>
            <Option value="10">INFP</Option>
            <Option value="11">INTJ</Option>
            <Option value="12">INTP</Option>
            <Option value="13">ISFJ</Option>
            <Option value="14">ISFP</Option>
            <Option value="15">ISTJ</Option>
            <Option value="16">ISTP</Option>
          </SSelect>
        </Info>
        <Info>
          <BigTitle>닮은꼴</BigTitle>
          <SInput
            value={s}
            maxLength={5}
            onChange={handleSimilarChange}
            placeholder="(선택)"
            autoComplete="off"
            required
            onBlur={() => {
              setMember({ ...member, appearance: s });
            }}
          />
          <SQuestion onClick={showModal2} />
          <Modal
            centered
            footer={null}
            open={isModalOpen2}
            onCancel={handleCancel2}
          >
            <Info2>
              <p>
                자신이 <Highlight>닮은 연예인</Highlight>이나{' '}
                <Highlight>동물</Highlight> 등을 적어주세요!
              </p>
              <Sp>생각해봐도 없다면 적지 않아도 괜찮아요.</Sp>
              <p>다만 닮은꼴을 입력하면 우리팀 구성원을 </p>
              <p>더 재미있게 소개할 수 있답니다!</p>
            </Info2>
          </Modal>
        </Info>
      </RightBox>
    </Container>
  );
}

export default Teambox;

const Container = styled.div`
  margin-top: 8%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${theme.background};
  border: 1px solid #f1ecec;
  border-radius: 10px;
  width: 340px;
  height: 200px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Title = styled.div`
  width: 100%;
  min-width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #999999;
  font-weight: 400;
  font-size: 16px;
  width: 100%;
  height: 35px;
  background-color: ${theme.lightPink};
  font-family: 'Nanum JungHagSaeng';
`;

const LeftBox = styled.div`
  padding-left: 24px;
  width: 100px;
  height: calc(200px - 35px);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const Profile = styled.div`
  &:hover {
    cursor: pointer;
  }
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: #ffffff;
  border: 1px solid #f1ecec;
  border-radius: 50%;
`;

const WhiteBoxPf = styled.div`
  padding-top: 20px;
`;

const ProfileTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 24px;
  color: #999999;
  font-family: 'Nanum JungHagSaeng';
  margin-bottom: 15px;
`;

const RightBox = styled.div`
  padding: 18px 0;
  padding-right: 20px;
  width: 169px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const Info = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 2px;
  padding-left: 8px;
  font-weight: 400;
  font-size: 20px;
  font-family: 'Nanum JungHagSaeng';
  color: ${theme.pink};
  width: 100%;
  max-width: 100%;
  border-bottom: 1px solid #eb8888;
`;

const BigTitle = styled.div`
  width: 40px;
`;

const Ttitle = styled.div`
  text-align: center;
  width: 100%;
  height: 5px;
  font-weight: 400;
  font-size: 13px;
`;

const SSelect = styled(Select)`
  position: relative;
  margin-left: 20px;
  width: 80px;
  min-width: 100px;
  color: red;
  font-family: 'Nanum JungHagSaeng';
  .ant-select {
    touch-action: none;
  }
`;

const SSearch = styled(Search)`
  margin-right: -8px;
`;

const SInput = styled(Input)`
  text-align: center;
  width: 100px;
  border: none;
  background-color: ${theme.background};
`;

const SModal = styled(Modal)`
  display: flex;
  justify-content: center;
`;

const Position = styled.div`
  padding-bottom: 2px;
  border: 1px solid #f1ecec;
  border-radius: 10px;
  margin-top: 20px;
  width: 334px;
  height: 257px;
  &:hover {
    border: 1px solid red;
    cursor: pointer;
  }
`;

const WhiteBox = styled.div`
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 160px;
  width: 100%;
`;

const BottomBox = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  height: 68px;
  padding: 10px 0;
  background-color: ${theme.background};
`;

const Btitle = styled.p`
  margin-top: 6px;
  width: 100%;
  font-weight: 700;
  font-size: 13px;
  color: ${theme.pink};
`;

const BsubTitle = styled.p`
  width: 100%;
  font-weight: 700;
  font-size: 13px;
`;

const SQuestion = styled(Question)`
  &:hover {
    cursor: pointer;
  }
`;

const Info2 = styled.div`
  font-family: 'Pretendard';
  text-align: center;
  padding: 20px;
`;

const Sp = styled.p`
  margin-top: 10px;
`;

const Highlight = styled.span`
  color: ${theme.pink};
`;

const ModalTitle = styled.p`
  margin-top: 15px;
  font-family: 'Nanum JungHagSaeng';
  font-weight: 400;
  font-size: 35px;
`;
