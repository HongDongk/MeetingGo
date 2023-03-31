import styled from 'styled-components';
import MyinfoHeader from './header/MyinfoHeader';

export default function MyinfoLayout({ children, title }) {
  return (
    <Container>
      <Header>
        <MyinfoHeader title={title} />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}

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
