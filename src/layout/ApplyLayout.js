import styled from 'styled-components';
import TopHeader from './header/TopHeader';

export default function ApplyLayout({ children }) {
  return (
    <Container>
      <Header>
        <TopHeader />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
`;

const Content = styled.div`
  max-width: 425px;
  background-color: rgb(245, 245, 245);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: scroll;
`;
