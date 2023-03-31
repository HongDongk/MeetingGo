import styled from 'styled-components';

export const MenuItem = styled.div`
  font-family: ${(props) => props.theme.primaryFont};
`;

export const LinkButton = styled.button`
  width: 100%;
  border: none;
  background-color: white;
  display: flex;
  color: ${(props) => props.theme.grey};
  font-family: ${(props) => props.theme.primaryFont};
  font-weight: 600;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 4px 8px;
  &:hover {
    cursor: pointer;
  }
`;

const MenuBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 1px solid #f1ecec;
  border-radius: 10px;
  margin-top: 20px;
  padding: 4px 20px;

  > ${MenuItem} {
    border-bottom: 3px solid #f8f3f3;
    :last-child {
      border: none;
    }
  }
`;

export default MenuBox;
