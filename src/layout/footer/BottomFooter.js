import styled from 'styled-components';
import Insta from '../../asset/img/Insta.png';
import Blog from '../../asset/img/Blog.png';

function BottomFooter() {
  return (
    <Footer>
      <InfoTitle>
        미팅학개론
        <ImgBox>
          <a
            href="https://instagram.com/meetingo.me_official?igshid=YmMyMTA2M2Y="
            target="_blank"
            rel="noreferrer"
          >
            <SImg src={Insta} />
          </a>
          <a
            href="https://blog.naver.com/meetingo_"
            target="_blank"
            rel="noreferrer"
          >
            <SImg src={Blog} />
          </a>
        </ImgBox>
      </InfoTitle>
      <Info>대표자 금아름 </Info>
      <Info>사업자등록번호 : 172-20-01807</Info>
      <Info>통신판매번호 : 2023-서울동대문-0225</Info>
      <Info>대표 번호 : 010-7583-9641 / noon.official.info@gmail.com</Info>
      <Info>주소지 : 서울시 동대문구 휘경로 20, 3층</Info>
    </Footer>
  );
}

export default BottomFooter;

const Footer = styled.div`
  width: 90%;
  margin-left: 30px;
  margin-top: 30px;
  padding-bottom: 10px;
`;
const InfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 72%;
  height: 35px;
  font-weight: 700;
  font-size: 10px;
  color: #9f9f9f;
`;
const Info = styled.div`
  margin-top: 5px;
  font-weight: 400;
  font-size: 7px;
  color: #9f9f9f;
`;
const ImgBox = styled.div``;
const SImg = styled.img`
  margin-left: 8px;
  &:hover {
    cursor: pointer;
  }
`;
