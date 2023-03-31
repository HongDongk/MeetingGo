import styled from 'styled-components';
import MainTabs from './header/MainTabs';
import TopHeader from './header/TopHeader';

function MainLayout({ children }) {
  return (
    <Container>
      <Header>
        <TopHeader />
        <MainTabs />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}
export default MainLayout;

const Container = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
`;

const Content = styled.div`
  max-width: 425px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background};
  overflow-y: scroll;
`;
