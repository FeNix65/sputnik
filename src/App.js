import React from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import StartScreen from './pages/StartScreen';

function App() {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();

    return (
      <AppRoot>
        <StartScreen />
      </AppRoot>
    );
  }

  return (
    <div>
      <h1>Ошибка: Telegram WebApp недоступен</h1>
    </div>
  );
  
}

export default App;
