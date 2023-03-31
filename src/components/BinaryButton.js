import styled from 'styled-components';

export default function BinaryButton(props) {
  const bgColor = ['#EB8888', '#F6EEEE'];
  const color = ['#FFFFFF', '#B79292'];

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <SelectButton
        onClick={() => props.onChange(true)}
        color={props.state ? color[0] : color[1]}
        background_color={props.state ? bgColor[0] : bgColor[1]}
      >
        {props.condition1}
      </SelectButton>
      <SelectButton
        onClick={() => props.onChange(false)}
        color={props.state ? color[1] : color[0]}
        background_color={props.state ? bgColor[1] : bgColor[0]}
      >
        {props.condition2}
      </SelectButton>
    </div>
  );
}

const SelectButton = styled.button`
  margin-right: 5px;
  border-radius: 14px;
  height: 40px;
  width: ${(props) => props.width || '50%'};
  max-width: 162px;
  background-color: ${(props) => props.background_color};
  color: ${(props) => props.color};
  border-color: transparent;
  font-family: 'Nanum JungHagSaeng';
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;
