import { Button } from 'antd';
import styled from 'styled-components';

const ApplyButton = styled(Button).attrs({ type: 'button' })`
  font-weight: 400;
  font-size: 24px;
  font-family: 'Nanum JungHagSaeng';
  background-color: white;
  width: 160px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.lightPink};
  color: ${(props) => props.theme.lightPink};
  &:hover {
    background-color: ${(props) => props.theme.pink};
    color: white;
  }
`;

export default ApplyButton;
