import styled from 'styled-components';
import { Button } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '../../asset/svg/LeftArrow.svg';

export default function MyinfoHeader({ title }) {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    // 이용권 구매 페이지인 경우
    if (window.location.pathname === '/myinfo/ticket/buy') {
      navigate('/myinfo/ticket');
    }
    // 이용권 현황 페이지인 경우
    else if (window.location.pathname === '/myinfo/ticket') {
      navigate('/myinfo');
    } else {
      navigate(-1);
    }
  }, [navigate]);

  return (
    <Container>
      <IconButton type="text" icon={<LeftArrow />} onClick={goBack}>
        {title}
      </IconButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px 10px;
  background-color: #f8f3f3;
  height: 4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconButton = styled(Button)`
  > svg {
    vertical-align: middle;
    margin-right: 16px;
  }
  > span {
    vertical-align: middle;
    font-weight: 600;
    font-size: 14px;
    color: #777777;
  }
`;
