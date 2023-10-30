import React from 'react';
import { Provider } from 'react-redux'
import { store } from './src/helpers/store'
import Router from './src/router/router';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
