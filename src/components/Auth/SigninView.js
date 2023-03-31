import { Button } from 'antd';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactComponent as BigO } from '../../asset/svg/BigO.svg';
import { ReactComponent as KakaoSignin } from '../../asset/svg/KakaoSignin.svg';
import { ReactComponent as Seconds } from '../../asset/svg/30seconds.svg';
import KakaoLoginLink from '../KakaoLoginLink';
import { setAccessToken } from '../../features/user';

export default function SigninView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const access = searchParams.get('access');

    if (access) {
      dispatch(setAccessToken(access));

      // query에 남아있는 access token 삭제
      searchParams.delete('access');
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  return (
    <Container>
      <ImageContainer>
        <BigO />
      </ImageContainer>

      <SigninDescription>
        미팅학개론을 이용하기 위해서는
        <br />
        카카오톡 로그인이 필요해요.
      </SigninDescription>
      <KakaoLink>
        <SSeconds />
        <KakaoButton icon={<KakaoSignin />} block>
          카카오 로그인
        </KakaoButton>
      </KakaoLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 53px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
  margin-bottom: 30px;
`;

const SigninDescription = styled.div`
  font-family: 'Nanum JungHagSaeng';
  font-size: 25px;
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 30px;
`;

const KakaoLink = styled(KakaoLoginLink)`
  display: block;
`;

const SSeconds = styled(Seconds)`
  margin-left: 22%;
`;

const KakaoButton = styled(Button)`
  background-color: #fee500;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #fee500;
  &:not(:disabled):hover {
    color: #000000;
  }

  > svg {
    vertical-align: middle;
    margin-right: 12px;
  }
  > span {
    vertical-align: middle;
    font-weight: 600;
    font-size: 25px;
  }
`;
