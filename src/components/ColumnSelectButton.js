import styled from 'styled-components';
import { useState } from 'react';

export default function ColumnSelectButton(props) {
  const { area, state, selectedArea } = props;

  return (
    <Column>
      {area.map((data) => (
        <AreaButton selectedArea={selectedArea} data={data} state={state} />
      ))}
    </Column>
  );
}
function AreaButton(props) {
  const { data, state, selectedArea } = props;
  const [clicked, setClicked] = useState(false);
  return (
    <Button
      color={clicked ? 'white' : null}
      backgroundcolor={clicked ? '#EB8888' : null}
      onClick={() => {
        setClicked(!clicked);

        state([...selectedArea, data]);
      }}
      key={data}
    >
      {' '}
      {data}
    </Button>
  );
}
const Column = styled.div`
  display: flex;
  flex-direction: column;

  height: auto;
  align-items: center;
  justify-content: center;
`;
const Button = styled.div`
  display: flex;
  margin: 5px 0 5px 0;
  border-radius: 10px;
  width: 90%;
  height: 40px;
  font-family: 'Nanum JungHagSaeng';
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundcolor || '#F6EEEE'};
  color: ${(props) => props.color || '#B79292'};
`;
