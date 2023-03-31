import styled from 'styled-components';
import { Link, useMatch } from 'react-router-dom';

export default function MainTabs() {
  const homeMatch = useMatch('/');
  const guideMatch = useMatch('/guide');
  const matchingMatch = useMatch('/matching');
  const myinfoMatch = useMatch('/myinfo');

  return (
    <Container>
      <Menu isactive={homeMatch}>
        <SLink to="/" isactive={homeMatch}>
          홈
        </SLink>
      </Menu>
      <Menu isactive={guideMatch}>
        <SLink to="/guide" isactive={guideMatch}>
          가이드
        </SLink>
      </Menu>
      <Menu isactive={matchingMatch}>
        <SLink to="/matching" isactive={matchingMatch}>
          매칭조회
        </SLink>
      </Menu>
      <Menu isactive={myinfoMatch}>
        <SLink to="/myinfo" isactive={myinfoMatch}>
          내정보
        </SLink>
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid ${(props) => props.theme.lightPink};
  padding: 10px 30px 3px 30px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  width: 23%;
  height: 30px;
  background-color: ${(props) =>
    `${props.isactive ? props.theme.pink : props.theme.background}`};
`;

const SLink = styled(Link)`
  color: ${(props) => `${props.isactive ? 'white' : '#858585'}`};
  font-weight: 400;
  font-size: 13px;
  width: 100%;
  text-decoration: none;
`;
