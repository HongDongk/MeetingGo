import styled from 'styled-components';

/**
 * mx: margin x축
 * my: margin y축
 */
const Section = styled.section`
  margin: ${({ my }) => my || '0px'} ${({ mx }) => mx || '20px'};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.grey};
  padding-left: 20px;
  padding-bottom: 10px;
`;

export default Section;
