import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/NavigationBar.css';

function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <NavLink to="/" className="nav-item">
        Чаты
      </NavLink>
      <NavLink to="/search" className="nav-item">
        Искать
      </NavLink>
      <NavLink to="/settings" className="nav-item">
        Настройки
      </NavLink>
    </nav>
  );
}

export default NavigationBar;
