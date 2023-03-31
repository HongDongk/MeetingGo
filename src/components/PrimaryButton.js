import { Button } from 'antd';
import styled from 'styled-components';

const PrimaryButton = styled(Button)`
  height: auto;
  font-family: 'Nanum JungHagSaeng';
  padding: 10px 50px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.pink};
  border: none;
  box-shadow: none;

  > span {
    font-weight: 400;
    font-size: 24px;
    color: white;
  }
`;

export default PrimaryButton;
