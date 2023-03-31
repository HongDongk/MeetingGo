import { createGlobalStyle } from 'styled-components';

const AntdCustomization = createGlobalStyle`
    .ant-notification-no-description {
        .ant-notification-notice-message {
            margin-bottom: 0;
        }
    }
`;

export default AntdCustomization;
