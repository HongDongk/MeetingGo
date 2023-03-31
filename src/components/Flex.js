import styled from 'styled-components';

/**
 * gap: 아이템 사이 간격
 */
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ gap }) => gap};
`;

export default Flex;
