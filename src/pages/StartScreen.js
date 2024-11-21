import React, { useEffect } from 'react';
import '../assets/styles/StartScreen.css';
import SputnikLogo from '../assets/images/sputnik-logo.png';
import { Button } from '@telegram-apps/telegram-ui';

function StartScreen() {
  const tg = window.Telegram.WebApp;

  // Подключаем тему
  useEffect(() => {
    const theme = tg?.themeParams || {};
    document.documentElement.style.setProperty('--bg-color', theme.bg_color || '#FFFFFF');
    document.documentElement.style.setProperty('--text-color', theme.text_color || '#000000');
    document.documentElement.style.setProperty('--secondary-bg-color', theme.secondary_bg_color || '#F7F8FA');
  }, [tg]);

  return (
    <div className="start-screen">
      <div className="start-screen-content">
        <h1>fdfdfdfd</h1>
        <img
          src={SputnikLogo}
          alt="logo"
          className="logo"
        />
        <h1>Спутник</h1>
        <h1>Спутник</h1>
        <h1>Спутник</h1>
        <h1>Спутник</h1>
        <p>
          Принципиально новый сервис для знакомств в Telegram, нацеленный на создание семейных пар.
        </p>
      </div>
      <Button
          size="l"
          onClick={() => {
            tg.sendData('profile:create'); // Отправка данных в Telegram WebApp
          }}
        >
          Создать профиль
        </Button>
    </div>
  );
}

export default StartScreen;
