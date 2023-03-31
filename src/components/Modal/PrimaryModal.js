import { Modal } from 'antd';
import styled from 'styled-components';

const PrimaryModal = styled(Modal)`
  max-width: 330px;

  .ant-modal-content,
  .ant-modal-header {
    background-color: #ece9e9;
  }
  .ant-modal-title {
    color: #777777;
    font-weight: 600;
    font-size: 14px;
    min-height: 14px;
  }
`;

export default PrimaryModal;
