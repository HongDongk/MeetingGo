import { Button, Modal } from 'antd';
import styled from 'styled-components';
import { ReactComponent as ErrorChar } from '../../asset/svg/ErrorMessageCharacter.svg';
import { ReactComponent as ModalTextPlace } from '../../asset/svg/ModalTextPlace.svg';
import theme from '../../style/theme';

export default function NotEnoughDateModal({ open, setModal }) {
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
            <ModalTextPlace />
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
const TextBox = styled.div`
  width: 100%;
  text-align: center;
`;
const BlackText = styled.span`
  font-size: 30px;
  font-family: 'Nanum JungHagSaeng';
`;
const ColorText = styled.span`
  color: ${theme.pink};
  font-size: 30px;
  font-family: 'Nanum JungHagSaeng';
`;

const SmallText = styled.span`
  font-weight: 400;
  font-size: 13px;
  color: #525252;
`;

const SButton = styled(Button)`
  margin-top: 10%;
  width: 100%;
  height: 50px;
  color: white;
  background-color: ${theme.pink};
`;
