import { Button } from 'antd';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as DownArrow } from '../asset/svg/DownArrow.svg';
import { ReactComponent as UpArrow } from '../asset/svg/UpArrow.svg';

export default function Accordion(props) {
  const [isShown, setIsShown] = useState(false);
  const handleToggle = useCallback(() => {
    setIsShown((prev) => !prev);
  }, []);

  return (
    <Container className={props.className}>
      <TitleBox onClick={handleToggle}>
        <Title>{props.title}</Title>
        {isShown ? <UpArrow /> : <DownArrow />}
      </TitleBox>
      {isShown && (
        <ContentBox>
          {props.content}
          {props.link && (
            <div>
              <MoreButton href={props.link} target="_blank">
                {props.linkText || '자세히 보기'} →
              </MoreButton>
            </div>
          )}
        </ContentBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: #ffffff;
  border: 1px solid #f1ecec;
  border-radius: 10px;
  padding: 0 22px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  :hover {
    cursor: pointer;
  }
`;
const Title = styled.span`
  font-size: 12px;
`;

const ContentBox = styled.div`
  border-top: 1px solid #f1ecec;
  font-size: 11px;
  line-height: 13px;
  padding: 15px 0;

  > p {
    margin: 8px 0;
  }
`;

const MoreButton = styled(Button)`
  color: #eb8888;
  border: 1px solid #eb8888;
  border-radius: 15px;
  margin: 8px 0;
  font-size: 9px;
  height: auto;
`;
