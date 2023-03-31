import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Modal } from 'antd';
import backend from '../../util/backend';
import { ReactComponent as BigO } from '../../asset/svg/BigO.svg';
import { ReactComponent as ProcessBar2 } from '../../asset/svg/ProcessBar2.svg';
import { ReactComponent as RightArrow } from '../../asset/svg/RightArrow.svg';
import { ReactComponent as CircleArrow } from '../../asset/svg/CircleArrow.svg';
import { ReactComponent as MatchingText3 } from '../../asset/svg/MatchingText3.svg';
// 로그인하고 매칭증에 상대방찾고 있을 때 매칭조회페이지

export default function LoginWaitMatch({ teamId }) {
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

  return (
    <>
      <Modal
        width="380px"
        open={openModal1}
        onCancel={handleCancel1}
        centered
        footer={null}
      >
        <Container>
          <ModalText1>
            지금 정보를 수정하시면 매칭이 늦어져요. 그래도 괜찮으신가요?
          </ModalText1>
          <SButton
            onClick={() => {
              navigate('/apply/1');
              setOpenModal1(false);
            }}
          >
            수정하러 가기
          </SButton>
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
        <ProcessBar2 />
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
          <SBigO />
          <SMatchingText3 />
          <MeetingButton href="https://furry-bank-197.notion.site/A-to-Z-0ac3369582fa4f43bbfd568d267433e7">
            미팅 팁 보러가기
          </MeetingButton>
        </WhiteBox>
        <WhiteBox2>
          <MenuItem
            onClick={() => {
              setOpenModal1(true);
            }}
          >
            프로필 수정하기 <RightArrow />
          </MenuItem>
          <Line />
          <MenuItem
            onClick={() => {
              navigate('/myinfo/ticket');
            }}
          >
            이용권 구매하러 가기 <RightArrow />
          </MenuItem>
          <Line />
          <MenuItem
            onClick={() => {
              setOpenModal2(true);
            }}
          >
            매칭 중단하기 <RightArrow />
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

const SBigO = styled(BigO)`
  margin-right: 5%;
`;

const SMatchingText3 = styled(MatchingText3)`
  margin-top: 5%;
`;

const MeetingButton = styled.a`
  font-family: 'Nanum JungHagSaeng';
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  border: none;
  margin-top: 7%;
  width: 160px;
  height: 50px;
  line-height: 50px;
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
  padding-top: 5%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModalText1 = styled.div`
  margin-top: 3%;
  text-align: center;
  width: 230px;
`;

const ModalText2 = styled.div`
  margin-top: 3%;
  text-align: center;
  width: 275px;
`;

const SButton = styled(Button)`
  margin-top: 10%;
  width: 100%;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.pink};
`;
