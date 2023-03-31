import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConfigProvider } from 'antd';
import theme from './style/theme';
import Router from './Router';
import antdTheme from './style/antdTheme';
import store from './store';
import JwtProvider from './providers/JwtProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={antdTheme}>
        <RouterProvider router={Router} />
      </ConfigProvider>
    </ThemeProvider>
    <JwtProvider />
  </Provider>,
);
