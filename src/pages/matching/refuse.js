import { useEffect, useCallback, useState } from 'react';

import MainFooter from '../../layout/footer/MainFooter';
import MainLayout from '../../layout/MainLayout';
import LoginRefuse from '../../components/MatchingBox/LoginRefuse';
import backend from '../../util/backend';

function Refuse() {
  const [myteamId, setMyteamId] = useState('');

  const getInformation = useCallback(async () => {
    const teamid = await backend.get(`/users/team-id`);

    setMyteamId(teamid.data.teamId);
  }, []);

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <MainLayout>
      <LoginRefuse teamId={myteamId} />
      <MainFooter />
    </MainLayout>
  );
}

export default Refuse;
