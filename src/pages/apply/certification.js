import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Input, Button, Modal } from 'antd';
import backend from '../../util/backend';
import ApplyLayout from '../../layout/ApplyLayout';
import { ReactComponent as CheckValid } from '../../asset/svg/CheckValid.svg';
import { ReactComponent as ModalTextPhone } from '../../asset/svg/ModalTextPhone.svg';
import { ReactComponent as CheckInvalid } from '../../asset/svg/CheckInvalid.svg';
import ChannelTalk from '../../asset/ChannelTalk';

function CertificationPage() {
  const [vaildcheck, setValidCheck] = useState(false);
  const { finishedStep } = useSelector((store) => store.apply);

  const [p, setP] = useState('');
  const [authorizeNumber, setAuthorizeNumber] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [submitOk1, setSubmitOk1] = useState(false);
  const navigate = useNavigate();
  const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  useEffect(() => {
    if (finishedStep < 5) {
      window.alert('잘못된 접근입니다');
      navigate(`/apply/${finishedStep + 1}`);
    }
  }, [finishedStep]);

  const handlePhoneNumber = useCallback(
    (e) => {
      setP(e.target.value);
    },
    [p],
  );
  const SubmitPhoneNumber = useCallback(() => {
    backend.post('/auth/phone', { phone: p });
    setSubmitOk1(true);
  });

  const handleAuthorizeNumber = useCallback(
    (e) => {
      setAuthorizeNumber(e.target.value);
    },
    [authorizeNumber],
  );

  const SubmitAuthorizeNumber = useCallback(async () => {
    try {
      await backend.post('/auth/phone/code', {
        phone: p,
        code: authorizeNumber,
      });
      window.alert('인증이 완료되었습니다');
      setValidCheck(true);
    } catch (e) {
      window.alert('인증번호가 틀렸습니다');
      setValidCheck(false);
    }
  }, [authorizeNumber]);

  return (
    <ApplyLayout>
      <Modal
        open={openModal}
        footer={null}
        centered
        width="380px"
        closable={false}
      >
        <ModalContainer>
          <SModalTextPhone />
          <SButton
            onClick={() => {
              setOpenModal(false);
              navigate('/apply/complete');
            }}
          >
            닫기
          </SButton>
        </ModalContainer>
      </Modal>
      <Title>
        <Maintitle>
          <Pink>전화번호 인증 </Pink>후
        </Maintitle>
        <Maintitle>미팅 신청이 완료됩니다</Maintitle>
      </Title>
      <Conatiner>
        <PhoneBox>
          전화번호
          <PhoneNumber>
            <InputBox>
              <SInput
                value={p}
                onChange={handlePhoneNumber}
                placeholder="전화번호 입력"
              />
            </InputBox>
          </PhoneNumber>
        </PhoneBox>
        <SubmitButton
          onClick={() => {
            SubmitPhoneNumber();
          }}
          disabled={!regex.test(p) || submitOk1}
        >
          인증번호 요청
        </SubmitButton>
        <PhoneBox>
          인증번호
          <PhoneNumber>
            <InputBox>
              <SInput
                value={authorizeNumber}
                onChange={handleAuthorizeNumber}
                placeholder="인증번호 입력"
              />
            </InputBox>
            {vaildcheck ? <SCheckValid /> : <SCheckInvalid />}
          </PhoneNumber>
        </PhoneBox>
        <SubmitButton
          onClick={SubmitAuthorizeNumber}
          disabled={!authorizeNumber || !regex.test(p) || vaildcheck}
        >
          인증번호 확인
        </SubmitButton>
      </Conatiner>
      <Footer>
        <SubmitButton
          onClick={() => {
            setOpenModal(true);
          }}
          disabled={!vaildcheck}
        >
          매칭 완료하기
        </SubmitButton>
      </Footer>
      <div>{ChannelTalk.hideChannelButton()}</div>
    </ApplyLayout>
  );
}

export default CertificationPage;

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

const Pink = styled.span`
  color: ${(props) => props.theme.pink};
`;

const Conatiner = styled.div`
  margin-bottom: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const PhoneBox = styled.div`
  margin-top: 5%;
  width: 90%;
  padding: 15px;
  background: #ffffff;
  border: 1px solid #f1ecec;
  border-radius: 10px;
  font-weight: 500;
  font-size: 13px;
  color: #777777;
`;

const PhoneNumber = styled.div`
  margin-top: 3%;
  display: flex;
`;

const InputBox = styled.div`
  width: 50%;
`;

const SCheckValid = styled(CheckValid)`
  margin-left: 40%;
`;

const SCheckInvalid = styled(CheckInvalid)`
  margin-left: 40%;
`;

const SInput = styled(Input)`
  width: 100%;
`;

const SubmitButton = styled(Button)`
  font-family: 'Nanum JungHagSaeng';
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  border: none;
  margin-top: 3%;
  width: 100%;
  height: 50px;
  background: #eb8888;
  border-radius: 10px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-bottom: 60%;
`;

const ModalContainer = styled.div`
  padding-top: 5%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SModalTextPhone = styled(ModalTextPhone)``;

const SButton = styled(Button)`
  margin-top: 10%;
  width: 100%;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.pink};
`;
