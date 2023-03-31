import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Chtalk } from '../../asset/svg/ChannelTalk.svg';
import Section from '../../components/Section';
import Accordion from '../../components/Accordion';
import MainLayout from '../../layout/MainLayout';
import ChannelTalk from '../../asset/ChannelTalk';

const guides = [
  {
    title: '미팅학개론 소개',
    content: `미팅에 재미를 더하다!💘<br/><em>미팅학개론</em>은 <em>쉽고 빠른 대학생 미팅 매칭 서비스</em>입니다.<br/><br/>서비스에 대해 더 자세한 정보를 원한다면<br/>하단의 페이지를 참고해 주세요.`,
    link: 'https://furry-bank-197.notion.site/9c7eacd16070426fab83478adfd4c091',
  },
  {
    title: '이용 대상',
    content: '<em>20대 대학생</em>이라면 누구나! 신청 가능합니다.😃',
  },
  {
    title: '신청 방법',
    content: `
    1. 지인과 팀을 만드신 후 <em>대표자만</em> 미팅학개론에 접속합니다.<br/>
    2. 프로세스를 따라 신청을 완료합니다. <br/>
    3. 매칭이 완료되는 대로 연락을 드리니 설레는 마음으로 기다려 주세요!✨ <br/><br/>
    🚩FINISH! 매칭된 상대팀의 미팅학개론을 확인하신 후 수락해 주세요. 이용권을 결제해 주신 뒤 상대팀도 수락하면 <em>단톡방까지 개설</em>해 드립니다.🤩`,
  },
  {
    title: '매칭까지의 기간',
    content: `스피드가 생명인 미팅!🏃🏻‍️ <br/>미팅학개론은 적합한 상대팀이 나타나면 즉시 매칭됩니다.<br/><br/>(단, 적합한 상대팀이 없는 경우 매칭이 지연될 수 있습니다.)`,
  },
  {
    title: '이용권 관련',
    content: `<em>미팅 1회 이용권은 4,900원입니다.</em><br/><br/>🍯TIP! 여러 장의 이용권을 한 번에 구매하실 경우 할인된 가격으로 좀 더 저렴하게 구매 가능합니다.☺️<br/><br/>매칭 후 수락하면 이용권 1장이 사용됩니다.<br/>상대팀이 거절했을 경우에는 이용권을 되돌려 드립니다.`,
  },
  {
    title: '이용권 환불',
    content:
      '<em>상단 채널톡</em>을 통해 문의 주시면 이용권 구매 후 10일 이내에 환불이 가능합니다.',
  },
  {
    title: '미팅 인원',
    content: `<em>3:3 팀으로만 미팅 참여가 가능합니다.</em><br/><br/>아쉽게도 현재 <1:1 소개팅>과  <2:2 미팅>, <4:4 미팅> 서비스는 지원하고 있지 않습니다.🥲`,
  },
  {
    title: '추가 문의',
    content:
      '기타 문의는 <em>상단 채널톡</em>으로 문의 주시면 빠르게 답변해 드립니다. 🙌🏻',
  },
];

export default function Guide() {
  const setting = {
    pluginKey: process.env.REACT_APP_CHANNEL_TALK_PLUGIN,
    memberId: window.localStorage.id,
    profile: {
      name: window.localStorage.nickname,
    },
    customLauncherSelector: ' #custom-button-1',
    hideChannelButtonOnBoot: true,
  };

  return (
    <MainLayout>
      <Section my="32px">
        <Container>
          <CustomChannelTalk id="custom-button-1">
            {ChannelTalk.boot(setting)}
          </CustomChannelTalk>
          {guides.map((guide) => (
            <Accordion
              {...guide}
              content={
                <ContentWrapper
                  dangerouslySetInnerHTML={{ __html: guide.content }}
                />
              }
              key={guide.title}
            />
          ))}
        </Container>
      </Section>
    </MainLayout>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  > svg {
    width: 100%;
    height: auto;
  }
`;

const CustomChannelTalk = styled(Chtalk)`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const ContentWrapper = styled.p`
  font-size: 11px;
  line-height: 13px;
  ol {
    list-style: decimal;
    padding-left: 12px;
    > li {
      margin: 2px 0;
    }
  }
  > em {
    color: #eb8888;
  }
`;
