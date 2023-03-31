import { createBrowserRouter } from 'react-router-dom';

import Main from './pages/index';
import App from './App';
import Guide from './pages/guide';
import Matching from './pages/matching';
import MatchingMyteam from './pages/matching/myteam';
import MatchingOtherteam from './pages/matching/otherteam';
import MatchingRefuse from './pages/matching/refuse';
import MyInfo from './pages/myinfo';
import Account from './pages/myinfo/account';
import Agree from './pages/apply/agree';
import Invite from './pages/apply/invite';
import Apply1 from './pages/apply/1';
import Apply2 from './pages/apply/2';
import Apply3 from './pages/apply/3';
import Apply4 from './pages/apply/4';
import Apply5 from './pages/apply/5';
import Apply6 from './pages/apply/6';
import Certification from './pages/apply/certification';
import Complete from './pages/apply/complete';
import TicketBuyPage from './pages/myinfo/ticket/buy';
import TicketCouponPage from './pages/myinfo/ticket/coupon';
import TicketHistoryPage from './pages/myinfo/ticket/history';
import AuthSigninPage from './pages/auth/signin';
import TicketPage from './pages/myinfo/ticket';
import TicketBuySuccessPage from './pages/myinfo/ticket/buy/success';
import TicketBuyFailPage from './pages/myinfo/ticket/buy/fail';
import AccountPhoneChangePage from './pages/myinfo/account/phone';
import KakakoLoginSuccessPage from './pages/auth/signin/kakao/success';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'guide',
        element: <Guide />,
      },
      {
        path: 'matching',
        element: <Matching />,
      },
      {
        path: 'matching/myteam',
        element: <MatchingMyteam />,
      },
      {
        path: 'matching/otherteam',
        element: <MatchingOtherteam />,
      },
      {
        path: 'matching/refuse',
        element: <MatchingRefuse />,
      },
      {
        path: 'myinfo',
        element: <MyInfo />,
      },
      {
        path: 'myinfo/account',
        element: <Account />,
      },
      {
        path: 'myinfo/account/phone',
        element: <AccountPhoneChangePage />,
      },
      {
        path: 'myinfo/ticket',
        element: <TicketPage />,
      },
      {
        path: 'myinfo/ticket/buy',
        element: <TicketBuyPage />,
      },
      {
        path: 'myinfo/ticket/buy/success',
        element: <TicketBuySuccessPage />,
      },
      {
        path: 'myinfo/ticket/buy/fail',
        element: <TicketBuyFailPage />,
      },
      {
        path: 'myinfo/ticket/coupon',
        element: <TicketCouponPage />,
      },
      {
        path: 'myinfo/ticket/history',
        element: <TicketHistoryPage />,
      },
      {
        path: 'apply/agree',
        element: <Agree />,
      },
      {
        path: 'apply/invite',
        element: <Invite />,
      },
      {
        path: 'apply/1',
        element: <Apply1 />,
      },
      {
        path: 'apply/2',
        element: <Apply2 />,
      },
      {
        path: 'apply/3',
        element: <Apply3 />,
      },
      {
        path: 'apply/4',
        element: <Apply4 />,
      },
      {
        path: 'apply/5',
        element: <Apply5 />,
      },
      {
        path: 'apply/6',
        element: <Apply6 />,
      },
      {
        path: 'apply/certification',
        element: <Certification />,
      },
      {
        path: 'apply/complete',
        element: <Complete />,
      },
      {
        path: '/auth/signin',
        element: <AuthSigninPage />,
      },
      {
        path: '/auth/signin/kakao/success',
        element: <KakakoLoginSuccessPage />,
      },
    ],
  },
]);

export default Router;
