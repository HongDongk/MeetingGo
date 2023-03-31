/* eslint-disable react/function-component-definition */
import styled from 'styled-components';
import { useEffect, useState, useMemo } from 'react';

const CounterBox = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentNumber = end;
    const counter = setInterval(() => {
      setCount(Math.ceil(end - currentNumber));

      if (currentNumber < 1) {
        clearInterval(counter);
      }
      const step = currentNumber / 30;
      currentNumber -= step;
    }, 20);
  }, [end]);

  const memberCount = useMemo(() => `${count || 0}`.padStart(4, '0'), [count]);

  return (
    <UserCountText>
      <CountBox>{memberCount[0]}</CountBox>
      <CountBox>{memberCount[1]}</CountBox>
      <CountBox>{memberCount[2]}</CountBox>
      <CountBox>{memberCount[3]}</CountBox>
    </UserCountText>
  );
};
const UserCountText = styled.span`
  display: flex;
`;

const CountBox = styled.span`
  position: relative;
  color: #000000;
  width: 8px;
  display: inline-block;
  border: 0.3px solid rgba(197, 200, 206, 0.5);
  border-radius: 3px;
  padding: 0.5px;
  margin-left: 2px;
  font-size: 13px;
  background: rgba(223, 223, 223, 0.3);
`;
export default CounterBox;
