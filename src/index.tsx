import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { persistor, store } from './store/store';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      <React.StrictMode>
      </React.StrictMode></BrowserRouter>,
  </Provider>,

  document.getElementById('root')
);
