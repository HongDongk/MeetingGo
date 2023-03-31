import styled from 'styled-components';

export default function ChooseButton(props) {
  return (
    <BigButton
      isActive={props.isActive}
      onClick={() => {
        props.onChange(!props.isActive);
      }}
    >
      {props.content}
    </BigButton>
  );
}

const BigButton = styled.button`
  margin-top: 5%;
  background: #f6eeee;
  border-radius: 10px;
  border: none;
  font-family: 'Nanum JungHagSaeng';
  width: 100%;
  height: 45px;
  font-weight: 400;
  font-size: 20px;
  color: ${(props) => (props.isActive ? '#F6EEEE' : '#B79292')};
  background: ${(props) => (props.isActive ? '#EB8888' : 'F6EEEE')};
  &:hover {
    cursor: pointer;
  }
`;
