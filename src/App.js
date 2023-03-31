import { Outlet } from 'react-router-dom';
import AntdCustomization from './style/AntdCustomization';
import GlobalStyle from './style/global';
// eslint-disable-next-line import/named
import { app } from './config/firebase';

function App() {
  return (
    <>
      <GlobalStyle />
      <AntdCustomization />
      <Outlet />
    </>
  );
}

export default App;
