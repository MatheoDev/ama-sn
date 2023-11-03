import React from 'react';
import { Provider } from 'react-redux'
import { store, persistor } from './src/helpers/store'
import Router from './src/router/router';
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}
