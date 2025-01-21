import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot } from '@telegram-apps/telegram-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppRoot>
    <App />
  </AppRoot>,
  document.getElementById('root')
);

reportWebVitals();
