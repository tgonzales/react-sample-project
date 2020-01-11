import React from 'react';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';
import { Container } from './styles/app';
import { Header } from './components';
import { Home } from './pages';

import store from './store';

import 'antd/dist/antd.css';

export default function App() {
  return (
    <Provider store={store}>
        <Container>
          {/* header */}
          <Header />

          {/* single Page */}
          <Home />

          {/* app styles */}
          <GlobalStyle />
        </Container>
    </Provider>
  );
}
