import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'antd';
import backend from '../../util/backend';
import ApplyLayout from '../../layout/ApplyLayout';
import { ReactComponent as CheckValid } from '../../asset/svg/CheckValid.svg';
import { ReactComponent as CheckInvalid } from '../../asset/svg/CheckInvalid.svg';
import ChannelTalk from '../../asset/ChannelTalk';

function AgreePage() {
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const [agree4, setAgree4] = useState(false);

  const navigate = useNavigate();

  const getInformation = useCallback(async () => {
    try {
      await backend.get('/users/agreements');
      navigate('/');
    } catch (e) {
      navigate('/apply/agree');
    }
  }, []);

  useEffect(() => {
    getInformation();
  }, []);

  const handleAgree = useCallback(() => {
    setAgree1(true);
    setAgree2(true);
    setAgree3(true);
    setAgree4(true);
  }, [agree1, agree2, agree3, agree4]);

  const NextPage = useCallback(() => {
    backend.post('/users/agreements', {
      service: agree1,
      privacy: agree2,
      age: agree3,
      marketing: agree4,
    });
    navigate('/apply/invite');
  });

  return (
    <ApplyLayout>
      <Title>
        <Maintitle>미팅학개론 이용을 위해</Maintitle>
        <Maintitle>
          <Pink>약관에 동의</Pink>해 주세요
        </Maintitle>
      </Title>
      <Conatiner>
        <SubmitButton onClick={handleAgree}>네, 모두 동의합니다</SubmitButton>
        <CheckBox>
          <CheckingContent
            onClick={() => {
              setAgree1((prev) => !prev);
            }}
          >
            {agree1 ? <CheckValid /> : <CheckInvalid />}
            {agree1 ? (
              <SA
                href="https://furry-bank-197.notion.site/4e3c4d1f8306494b9a54fc2226e9a3b7"
                target="_blank"
                rel="noreferrer"
              >
                서비스 이용약관 동의
              </SA>
            ) : (
              '서비스 이용약관 동의'
            )}
            <Pink>&nbsp;&nbsp;(필수)</Pink>
          </CheckingContent>
          <CheckingContent
            onClick={() => {
              setAgree2((prev) => !prev);
            }}
          >
            {agree2 ? <CheckValid /> : <CheckInvalid />}
            {agree2 ? (
              <SA
                href="https://www.notion.so/c83f4127e3c54b7080c333aa31a4cc03"
                target="_blank"
                rel="noreferrer"
              >
                개인정보 수집 및 이용 동의
              </SA>
            ) : (
              '개인정보 수집 및 이용 동의'
            )}
            <Pink>&nbsp;&nbsp;(필수)</Pink>
          </CheckingContent>
          <CheckingContent
            onClick={() => {
              setAgree3((prev) => !prev);
            }}
          >
            {agree3 ? <CheckValid /> : <CheckInvalid />}만 19세 이상 입니다.
            <Pink>&nbsp;&nbsp;(필수)</Pink>
          </CheckingContent>
          <CheckingContent
            onClick={() => {
              setAgree4((prev) => !prev);
            }}
          >
            {agree4 ? <CheckValid /> : <CheckInvalid />}이벤트/혜택 정보 수신
            동의<Pink>&nbsp;&nbsp;(선택)</Pink>
          </CheckingContent>
        </CheckBox>
      </Conatiner>
      <Footer>
        <SubmitButton
          onClick={NextPage}
          disabled={!agree1 || !agree2 || !agree3}
        >
          다음
        </SubmitButton>
      </Footer>
      <div>{ChannelTalk.hideChannelButton()}</div>
    </ApplyLayout>
  );
}

export default AgreePage;

const SA = styled.a`
  text-decoration: none;
  color: black;
`;

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

const CheckBox = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 80%;
`;

const CheckingContent = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  width: 90%;
  &:hover {
    cursor: pointer;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 5%;
  font-family: 'Nanum JungHagSaeng';
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  border: none;
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
  margin-bottom: 50%;
`;
