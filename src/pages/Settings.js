import React, { useEffect } from 'react';
import '../assets/styles/Settings.css';

function Settings() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    const theme = tg?.themeParams || {};

    // Устанавливаем цвета в зависимости от темы
    document.documentElement.style.setProperty('--bg-color', theme.bg_color || '#EFEFF4');
    document.documentElement.style.setProperty('--text-color', theme.text_color || '#000000');
    document.documentElement.style.setProperty('--secondary-bg-color', theme.secondary_bg_color || '#ffffff');
    document.documentElement.style.setProperty('--hint-color', theme.hint_color || '#D9D9D9');
    document.documentElement.style.setProperty('--button-color', theme.button_color || '#007aff');
  }, []);

  return (
    <div className="settings-page">

      <div className="profile-section">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/80"
            alt="Avatar"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2 className="profile-name">Павел Воля</h2>
            <button className="profile-edit">Редактировать профиль</button>
          </div>
        </div>
        <div className="profile-visibility">
          <span>Видимость</span>
          <button className="profile-visibility-status">Виден всем</button>
        </div>
      </div>


      <h3 className="section-title">Настройки аккаунта</h3>
      <div className="settings-section">

        <ul className="settings-list">
          <li className="settings-item">
            <div className="settings-icon">🔔</div>
            <span className="settings-text">Уведомления</span>
          </li>
          <li className="settings-item">
            <div className="settings-icon">🚫</div>
            <span className="settings-text">Черный список</span>
          </li>
          <li className="settings-item">
            <div className="settings-icon">🔒</div>
            <span className="settings-text">Безопасность</span>
          </li>
        </ul>
        <p className="settings-note">
          Вы можете привязать дополнительные аккаунты к вашему профилю, чтобы повысить его безопасность.
        </p>
      </div>


      <h3 className="section-title">Прочая информация</h3>
      <div className="info-section">
        
        <ul className="info-list">
          <li className="info-item">
            <div className="info-icon">🌐</div>
            <span className="info-text">Условия использования</span>
          </li>
          <li className="info-item">
            <div className="info-icon">ℹ️</div>
            <span className="info-text">Информация о приложении</span>
          </li>
          <li className="info-item">
            <div className="info-icon">📣</div>
            <span className="info-text">Сообщить о проблеме</span>
          </li>
        </ul>
      </div>

      <footer className="app-footer">Спутник — v1.0.2-beta</footer>
    </div>
  );
}

export default Settings;
