import React, { useEffect } from 'react';
import '../assets/styles/StartScreen.css';
import SputnikLogo from '../assets/images/sputnik-logo.png';
import { Placeholder, Button } from '@telegram-apps/telegram-ui';

function StartScreen() {
  const tg = window.Telegram.WebApp;

  // Подключаем тему
  useEffect(() => {
    if (tg?.themeParams) {
      const { bg_color, text_color,  secondary_bg_color} = tg.themeParams;
      document.documentElement.style.setProperty('--bg-color', bg_color || '#EFEFF4');
      document.documentElement.style.setProperty('--text-color', text_color || '#000000');
      document.documentElement.style.setProperty('--secondary-bg-color', secondary_bg_color || '#FFFFFF');
    }
  }, [tg]);

  return (
    <div className="HIJtihMA8FHczS02iWF5">
      <Placeholder
        description="Принципиально новый сервис для знакомств в Telegram, нацеленный на создание семейных пар."
        // style={{
        //   color: 'var(--text-color)',
        // }}
        header="Спутник"
      >
        <img
          alt="Telegram sticker"
          className="sputnik-logo"
          src={SputnikLogo}
        />
      </Placeholder>
      <Button
        mode="filled"
        size="l"
        stretched
        style={{
          color: 'var(--text-color)',
        }}
      >
        Создать профиль
      </Button>
    </div>
  );
}

export default StartScreen;
