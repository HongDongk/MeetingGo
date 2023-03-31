import { Button, Modal } from 'antd';
import styled from 'styled-components';
import { ReactComponent as ErrorChar } from '../../asset/svg/ErrorMessageCharacter.svg';
import { ReactComponent as MatchingText11 } from '../../asset/svg/MatchingText11.svg';
import theme from '../../style/theme';

export default function NotEnoughIntroModal({ open, setModal }) {
  return (
    <div>
      {open ? (
        <Modal
          open={open}
          footer={null}
          centered
          width="380px"
          closable={false}
        >
          <Container>
            <ErrorChar />
            <MatchingText11 />
            <SButton onClick={() => setModal(false)}>닫기</SButton>
          </Container>
        </Modal>
      ) : null}
    </div>
  );
}
const Container = styled.div`
  padding-top: 5%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SButton = styled(Button)`
  margin-top: 10%;
  width: 100%;
  height: 50px;
  color: white;
  background-color: ${theme.pink};
`;
