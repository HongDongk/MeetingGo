import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

import { Modal, Button } from 'antd';
import { ReactComponent as LeftArrow } from '../../asset/svg/LeftArrow.svg';
import Universities from '../../asset/Universities';
import Mbti from '../../asset/Mbti';
import theme from '../../style/theme';
import ApplyLayout from '../../layout/ApplyLayout';
import ApplyButton from '../../components/ApplyButton';
import backend from '../../util/backend';
import { useGetUserTicketCountQuery } from '../../features/backendApi';

function MatchingOtherTeam() {
  const { data: ticketData, refetch: refetchTicketData } =
    useGetUserTicketCountQuery();
  const [myteamId, setMyteamId] = useState('');
  const [matchingId, setMatchingId] = useState('');
  const [otherTeamData, setOtherTeamData] = useState({});
  const [matchingStatus, setMatchingStatus] = useState('');

  const getMatchingId = useCallback(async () => {
    const matchingstatus = await backend.get('/users/matchings/status');
    const teamid = await backend.get(`/users/team-id`);
    const matchingid = await backend.get(
      `/teams/${teamid.data.teamId}/matching-id`,
    );
    const matchingdata = await backend.get(
      `/matchings/${matchingid.data.matchingId}`,
    );
    const pureotherTeamData = await backend.get(
      `/teams/${matchingdata.data.partnerTeamId}`,
    );
    setMatchingStatus(matchingstatus.data.matchingStatus);
    setMyteamId(teamid.data.teamId);
    setMatchingId(matchingid.data.matchingId);
    setOtherTeamData(pureotherTeamData.data);
  }, []);

  useEffect(() => {
    getMatchingId();
  }, []);

  useEffect(() => {
    refetchTicketData();
  }, [refetchTicketData]);

  const navigate = useNavigate();

  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

  const handleCancel1 = () => {
    setOpenModal1(false);
  };

  const handleCancel2 = () => {
    setOpenModal2(false);
  };

  const handleCancel3 = () => {
    setOpenModal3(false);
  };

  const handleOkay = useCallback(async () => {
    try {
      await backend.put(`/matchings/${matchingId}/teams/${myteamId}/accept`);
    } catch {
      setOpenModal1(true);
    }
  });

  const handleRefuse = useCallback(async () => {
    await backend.put(`/matchings/${matchingId}/teams/${myteamId}/refuse`);
    await backend.post(
      `/matchings/${matchingId}/teams/${myteamId}/refuse-reason`,
      {
        reason1: false,
        reason2: false,
        reason3: false,
      },
    );
  });

  const RoleContent = {
    1: '비주얼',
    2: '사회자',
    3: '개그맨',
    4: '깍두기',
  };

  const SchoolContent = {
    1: '강남',
    2: '건대',
    3: '신촌',
    4: '홍대',
    5: '상관없음',
  };

  const VibeContent = {
    1: '코로나 때문에 못한 연애오늘?!',
    2: '친구는 다다익선! 찐친 만들어 보자',
    3: '왁자지껄 이 밤이 떠나가라!',
    4: '술게임 한 수 배우러 왔습니다',
    5: '술게임 못해도 챙겨주는 훈훈한 분위기',
  };

  const AlcholContent = {
    1: '(소주 반 병)',
    2: '(소주 한 병)',
    3: '(소주 한 병 반)',
    4: '(소주 두 병)',
    5: '(술고래)',
  };

  if (
    otherTeamData !== undefined &&
    otherTeamData?.prefAge !== undefined &&
    otherTeamData?.members !== undefined
  ) {
    return (
      <ApplyLayout>
        <Modal
          width="380px"
          open={openModal1}
          onCancel={handleCancel1}
          centered
          footer={null}
        >
          <ModalContainer>
            <ModalText1>수락하기 위해서는 이용권이 필요해요</ModalText1>
            <ModalText1>상대팀이 거절할 경우 이용권이 반환돼요.</ModalText1>
            <ModalButton
              onClick={() => {
                handleCancel1();
                navigate('/myinfo/ticket');
              }}
            >
              이용권구매하기
            </ModalButton>
          </ModalContainer>
        </Modal>
        <Modal
          width="380px"
          open={openModal2}
          onCancel={handleCancel2}
          centered
          footer={null}
        >
          <ModalContainer>
            <ModalText2>
              거절하시면 상대팀과 다시 매칭될수 없어요. 그래도 거절하시겠어요?
            </ModalText2>
            <ModalButton
              onClick={() => {
                handleRefuse();
                handleCancel2();
                navigate('/matching/refuse');
              }}
            >
              거절하기
            </ModalButton>
          </ModalContainer>
        </Modal>
        <Modal
          width="380px"
          open={openModal3}
          onCancel={handleCancel3}
          centered
          footer={null}
        >
          <ModalContainer>
            <ModalText1>수락하시면 이용권 한장이 사용돼요.</ModalText1>
            <ModalText1>만약 상대팀이 거절할경우</ModalText1>
            <ModalText1>이용권이 반환되요.</ModalText1>
            <ModalButton
              onClick={() => {
                handleOkay();
                handleCancel3();
                navigate('/matching');
              }}
            >
              수락하기
            </ModalButton>
          </ModalContainer>
        </Modal>
        <Content>
          <Title>
            <SLeftArrow
              onClick={() => {
                navigate('/matching');
              }}
            />
            상대팀 미팅학개론
          </Title>
          <InfoBox>
            <InfoTitle>
              1. <Pink>상대는</Pink> 이런 팀이에요!
            </InfoTitle>
            <InfoContent>
              <Info>
                <SmallTitle>성별</SmallTitle>
                <SmallContent>
                  {otherTeamData?.gender === 1 ? '남성' : '여성'}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>인원수</SmallTitle>
                <SmallContent>
                  {otherTeamData?.memberCount === 2 ? '2명' : '3명'}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>학교</SmallTitle>
                <SmallContent>
                  {otherTeamData?.universities?.map((a) => {
                    return (
                      <div key={Universities[a - 1].id}>
                        {Universities[a - 1].name} /
                      </div>
                    );
                  })}
                </SmallContent>
              </Info>
            </InfoContent>
            <InfoContent>
              <Info>
                {otherTeamData?.memberCount === 2 ? (
                  <Member>
                    <div>대표자</div>
                    <div>팀원 1</div>
                  </Member>
                ) : (
                  <Member2>
                    <div>대표자</div>
                    <div>팀원 1</div>
                    <div>팀원 2</div>
                  </Member2>
                )}
              </Info>
              <Info>
                <SmallTitle>나이</SmallTitle>
                {otherTeamData?.memberCount === 2 ? (
                  <MemberProfile>
                    <div>{otherTeamData?.members[0]?.age}세</div>
                    <div>{otherTeamData?.members[1]?.age}세</div>
                  </MemberProfile>
                ) : (
                  <MemberProfile2>
                    <div>{otherTeamData?.members[0]?.age}세</div>
                    <div>{otherTeamData?.members[1]?.age}세</div>
                    <div>{otherTeamData?.members[2]?.age}세</div>
                  </MemberProfile2>
                )}
              </Info>
              <Info>
                <SmallTitle>MBTI</SmallTitle>
                {otherTeamData?.memberCount === 2 ? (
                  <MemberProfile>
                    <div>
                      {
                        Mbti[parseInt(otherTeamData?.members[0]?.mbti) - 1]
                          ?.name
                      }
                    </div>
                    <div>
                      {
                        Mbti[parseInt(otherTeamData?.members[1]?.mbti) - 1]
                          ?.name
                      }
                    </div>
                  </MemberProfile>
                ) : (
                  <MemberProfile2>
                    <div>
                      {
                        Mbti[parseInt(otherTeamData?.members[0]?.mbti) - 1]
                          ?.name
                      }
                    </div>
                    <div>
                      {
                        Mbti[parseInt(otherTeamData?.members[1]?.mbti) - 1]
                          ?.name
                      }
                    </div>
                    <div>
                      {
                        Mbti[parseInt(otherTeamData?.members[2]?.mbti) - 1]
                          ?.name
                      }
                    </div>
                  </MemberProfile2>
                )}
              </Info>
              <Info>
                <SmallTitle>포지션</SmallTitle>
                {otherTeamData?.memberCount === 2 ? (
                  <MemberProfile>
                    <div>{RoleContent[otherTeamData?.members[0]?.role]}</div>
                    <div>{RoleContent[otherTeamData?.members[1]?.role]}</div>
                  </MemberProfile>
                ) : (
                  <MemberProfile2>
                    <div>{RoleContent[otherTeamData?.members[0]?.role]}</div>
                    <div>{RoleContent[otherTeamData?.members[1]?.role]}</div>
                    <div>{RoleContent[otherTeamData?.members[2]?.role]}</div>
                  </MemberProfile2>
                )}
              </Info>
              <Info>
                <SmallTitle>닮은꼴</SmallTitle>
                {otherTeamData?.memberCount === 2 ? (
                  <MemberProfile>
                    <div>{otherTeamData?.members[0]?.appearance}</div>
                    <div>{otherTeamData?.members[1]?.appearance}</div>
                  </MemberProfile>
                ) : (
                  <MemberProfile2>
                    <div>{otherTeamData?.members[0]?.appearance}</div>
                    <div>{otherTeamData?.members[1]?.appearance}</div>
                    <div>{otherTeamData?.members[2]?.appearance}</div>
                  </MemberProfile2>
                )}
              </Info>
            </InfoContent>
          </InfoBox>
          <InfoBox>
            <InfoTitle>
              3. <Pink>미팅</Pink>은 이랬으면 좋겠어요!
            </InfoTitle>
            <InfoContent>
              <Info>
                <SmallTitle>선호 날짜</SmallTitle>
                <SmallContent>
                  {otherTeamData?.availableDates.map((a) => {
                    return (
                      <div key={a}>
                        {a[6]}월 {a.substring(8, 10)}일 /
                      </div>
                    );
                  })}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>선호 지역</SmallTitle>
                <SmallContent>
                  {otherTeamData?.areas.map((a) => {
                    return <div key={a}> {SchoolContent[a]} /</div>;
                  })}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>분위기</SmallTitle>
                <SmallContent>
                  {otherTeamData?.prefVibes.map((a) => {
                    return <div key={a}>{VibeContent[a]}</div>;
                  })}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>주량 레벨</SmallTitle>
                <SmallContent>
                  Level {otherTeamData?.drink}{' '}
                  {AlcholContent[otherTeamData?.drink]}
                </SmallContent>
              </Info>
            </InfoContent>
          </InfoBox>
          <InfoBox>
            <InfoTitle>
              4. 상대팀 <Pink>한 줄 어필</Pink>
            </InfoTitle>
            <InfoContent>
              <Info>
                <SmallContent>{otherTeamData?.intro}</SmallContent>
              </Info>
            </InfoContent>
          </InfoBox>
          <Alarm>상대팀 미팅학개론을 캡쳐해서 팀원들에게 공유해보세요!</Alarm>
          {matchingStatus === 'MATCHED' ? (
            <Footer>
              <ButtonBox>
                <ApplyButton
                  onClick={() => {
                    if (ticketData?.ticketCount > 0) {
                      setOpenModal3(true);
                    } else {
                      setOpenModal1(true);
                    }
                  }}
                >
                  수락하기
                </ApplyButton>
                <ApplyButton
                  onClick={() => {
                    setOpenModal2(true);
                  }}
                >
                  거절하기
                </ApplyButton>
              </ButtonBox>
            </Footer>
          ) : null}
        </Content>
      </ApplyLayout>
    );
  }
  return null;
}

export default MatchingOtherTeam;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5%;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  color: #777777;
`;

const SLeftArrow = styled(LeftArrow)`
  padding-right: 4%;
  &:hover {
    cursor: pointer;
  }
`;

const Alarm = styled.div`
  margin-top: 10%;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  width: 90%;
`;

const Pink = styled.span`
  color: ${theme.pink};
`;

const Content = styled.div`
  width: 90%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoBox = styled.div`
  margin-top: 8%;
  width: 90%;
  padding: 17px;
  background-color: white;
  border: 1px solid #f1ecec;
  border-radius: 10px;
`;

const InfoTitle = styled.div`
  padding-bottom: 10px;
  font-weight: 600;
  font-size: 14px;
`;

const InfoContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 5px;
  border-top: 1px solid #f1ecec;
`;

const Info = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
`;

const SmallTitle = styled.span`
  width: 23%;
  max-width: 23%;
  font-family: 'Nanum JungHagSaeng';
  color: #bbbbbb;
  font-weight: 400;
  font-size: 21px;
`;

const SmallContent = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  word-break: break-all;
  font-family: 'Nanum JungHagSaeng';
  color: #777777;
  font-weight: 400;
  font-size: 21px;
`;

const Member = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 23%;
  width: 35%;
  font-family: 'Nanum JungHagSaeng';
  color: #bbbbbb;
  font-weight: 400;
  font-size: 21px;
`;

const Member2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 23%;
  width: 60%;
  font-family: 'Nanum JungHagSaeng';
  color: #bbbbbb;
  font-weight: 400;
  font-size: 21px;
`;

const MemberProfile = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35%;
  font-family: 'Nanum JungHagSaeng';
  color: #777777;
  font-weight: 400;
  font-size: 21px;
`;

const MemberProfile2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  font-family: 'Nanum JungHagSaeng';
  color: #777777;
  font-weight: 400;
  font-size: 21px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10%;
  padding-bottom: 5%;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  justify-content: space-between;
`;

const ModalContainer = styled.div`
  padding-top: 5%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModalText1 = styled.div`
  margin-top: 3%;
  text-align: center;
  width: 230px;
`;

const ModalText2 = styled.div`
  margin-top: 3%;
  text-align: center;
  width: 250px;
`;

const ModalButton = styled(Button)`
  margin-top: 10%;
  width: 100%;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.pink};
`;
