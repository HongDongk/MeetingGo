import styled from 'styled-components';

import { ReactComponent as HappyFace } from '../asset/svg/HappyFace.svg';

const Progress = styled.div`
  margin-top: 20px;
  position: relative;
  width: 90%;
  height: 24px;
  background-color: #f1ecec;
  border-radius: 20px;
`;

const IngBar = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  ${({ progress }) => {
    return progress ? `width: ${progress * 20}%` : `width: 0`;
  }};
  background-color: ${(props) => props.theme.lightPink};
  border-radius: 20px;
`;

export default function ProgressBar({ page }) {
  return (
    <Progress>
      <IngBar progress={page}>
        <HappyFace />
      </IngBar>
    </Progress>
  );
}
