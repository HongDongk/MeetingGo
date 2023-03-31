import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { Modal, Button } from 'antd';
import { ReactComponent as LeftArrow } from '../../asset/svg/LeftArrow.svg';
import theme from '../../style/theme';
import Universities from '../../asset/Universities';
import Mbti from '../../asset/Mbti';
import ApplyLayout from '../../layout/ApplyLayout';
import backend from '../../util/backend';

function MatchingMyTeam() {
  const [myTeamData, setMyTeamData] = useState('');

  const getMatchingId = useCallback(async () => {
    const teamid = await backend.get(`/users/team-id`);
    const myteamdata = await backend.get(`/teams/${teamid.data.teamId}`);
    setMyTeamData(myteamdata.data);
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    getMatchingId();
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const handleCancel = () => {
    setOpenModal(false);
  };

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
    myTeamData !== undefined &&
    myTeamData?.prefAge !== undefined &&
    myTeamData?.members !== undefined
  ) {
    return (
      <ApplyLayout>
        <Modal
          width="380px"
          open={openModal}
          onCancel={handleCancel}
          centered
          footer={null}
        >
          <ModalContainer>
            <ModalText>
              지금 정보를 수정하면 매칭이 늦어져요. 그래도 괜찮으신가요?
            </ModalText>
            <ModalButton
              onClick={() => {
                handleCancel();
                navigate('/apply/1');
              }}
            >
              수정하러가기
            </ModalButton>
          </ModalContainer>
        </Modal>
        <Content>
          <TopBox>
            <SLeftArrow
              onClick={() => {
                navigate('/matching');
              }}
            />{' '}
            &nbsp;&nbsp;&nbsp;우리팀 프로필 조회
          </TopBox>
          <InfoBox>
            <InfoTitle>
              1. <Pink>우리는</Pink> 이런 팀이에요!
            </InfoTitle>
            <InfoContent>
              <Info>
                <SmallTitle>성별</SmallTitle>
                <SmallContent>
                  {myTeamData?.gender === 1 ? '남성' : '여성'}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>인원수</SmallTitle>
                <SmallContent>
                  {myTeamData?.memberCount === 2 ? '2명' : '3명'}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>학교</SmallTitle>
                <SmallContent>
                  {myTeamData?.universities?.map((a) => {
                    return (
                      <div key={Universities[a - 1].id}>
                        {Universities[a - 1]?.name} /
                      </div>
                    );
                  })}
                </SmallContent>
              </Info>
            </InfoContent>
            <InfoContent>
              <Info>
                {myTeamData?.memberCount === 2 ? (
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
                {myTeamData?.memberCount === 2 ? (
                  <MemberProfile>
                    <div>{myTeamData?.members[0]?.age}세</div>
                    <div>{myTeamData?.members[1]?.age}세</div>
                  </MemberProfile>
                ) : (
                  <MemberProfile2>
                    <div>{myTeamData?.members[0]?.age}세</div>
                    <div>{myTeamData?.members[1]?.age}세</div>
                    <div>{myTeamData?.members[2]?.age}세</div>
                  </MemberProfile2>
                )}
              </Info>
              <Info>
                <SmallTitle>MBTI</SmallTitle>
                {myTeamData?.memberCount === 2 ? (
                  <MemberProfile>
                    <div>
                      {Mbti[parseInt(myTeamData?.members[0]?.mbti) - 1]?.name}
                    </div>
                    <div>
                      {Mbti[parseInt(myTeamData?.members[1]?.mbti) - 1]?.name}
                    </div>
                  </MemberProfile>
                ) : (
                  <MemberProfile2>
                    <div>
                      {Mbti[parseInt(myTeamData?.members[0]?.mbti) - 1]?.name}
                    </div>
                    <div>
                      {Mbti[parseInt(myTeamData?.members[1]?.mbti) - 1]?.name}
                    </div>
                    <div>
                      {Mbti[parseInt(myTeamData?.members[2]?.mbti) - 1]?.name}
                    </div>
                  </MemberProfile2>
                )}
              </Info>
              <Info>
                <SmallTitle>포지션</SmallTitle>
                {myTeamData?.memberCount === 2 ? (
                  <MemberProfile>
                    <div>{RoleContent[myTeamData?.members[0]?.role]}</div>
                    <div>{RoleContent[myTeamData?.members[1]?.role]}</div>
                  </MemberProfile>
                ) : (
                  <MemberProfile2>
                    <div>{RoleContent[myTeamData?.members[0]?.role]}</div>
                    <div>{RoleContent[myTeamData?.members[1]?.role]}</div>
                    <div>{RoleContent[myTeamData?.members[2]?.role]}</div>
                  </MemberProfile2>
                )}
              </Info>
              <Info>
                <SmallTitle>닮은꼴</SmallTitle>
                {myTeamData?.memberCount === 2 ? (
                  <MemberProfile>
                    <div>{myTeamData?.members[0]?.appearance}</div>
                    <div>{myTeamData?.members[1]?.appearance}</div>
                  </MemberProfile>
                ) : (
                  <MemberProfile2>
                    <div>{myTeamData?.members[0]?.appearance}</div>
                    <div>{myTeamData?.members[1]?.appearance}</div>
                    <div>{myTeamData?.members[2]?.appearance}</div>
                  </MemberProfile2>
                )}
              </Info>
            </InfoContent>
          </InfoBox>
          <InfoBox>
            <InfoTitle>
              2. <Pink>상대</Pink>는 이런 팀을 원해요!
            </InfoTitle>
            <InfoContent>
              <Info>
                <SmallTitle>평균 나이</SmallTitle>
                <SmallContent>
                  {myTeamData?.prefAge[0]} ~ {myTeamData?.prefAge[1]}세
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>학교</SmallTitle>
                <SmallContent>
                  {myTeamData?.prefSameUniversity
                    ? '상관없어요'
                    : '같은학교는 싫어요'}
                </SmallContent>
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
                  {myTeamData?.availableDates?.map((a) => {
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
                  {myTeamData?.areas?.map((a) => {
                    return <div key={a}> {SchoolContent[a]} /</div>;
                  })}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>분위기</SmallTitle>
                <SmallContent>
                  {myTeamData?.prefVibes?.map((a) => {
                    return <div key={a}>{VibeContent[a]}</div>;
                  })}
                </SmallContent>
              </Info>
              <Info>
                <SmallTitle>주량 레벨</SmallTitle>
                <SmallContent>
                  Level {myTeamData?.drink} {AlcholContent[myTeamData?.drink]}
                </SmallContent>
              </Info>
            </InfoContent>
          </InfoBox>
          <InfoBox>
            <InfoTitle>
              4. 우리팀 <Pink>한 줄 어필</Pink>
            </InfoTitle>
            <InfoContent>
              <Info>
                <SmallContent>{myTeamData?.intro}</SmallContent>
              </Info>
            </InfoContent>
          </InfoBox>
        </Content>
      </ApplyLayout>
    );
  }
}

export default MatchingMyTeam;

const Pink = styled.span`
  color: ${theme.pink};
`;

const Content = styled.div`
  padding-bottom: 5%;
  width: 90%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBox = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  color: #777777;
  margin-top: 8%;
`;

const SLeftArrow = styled(LeftArrow)`
  &:hover {
    cursor: pointer;
  }
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

const ModalContainer = styled.div`
  padding-top: 5%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ModalText = styled.div`
  margin-top: 3%;
  text-align: center;
  width: 220px;
`;

const ModalButton = styled(Button)`
  margin-top: 10%;
  width: 100%;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.pink};
`;
