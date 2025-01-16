import React, { createContext, useState, useContext } from "react";

// Создаем контекст
const AuthContext = createContext();

// Провайдер для контекста
export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState({
    accessToken: null,
    refreshToken: null,
  });

  const saveTokens = (accessToken, refreshToken) => {
    setTokens({ accessToken, refreshToken });
  };

  const clearTokens = () => {
    setTokens({ accessToken: null, refreshToken: null });
  };

  // Функция для обновления токенов
  const refreshTokens = () => {
    const refreshToken = tokens.refreshToken;

    return fetch("https://аааааааааааа-женщины.рф/api/auth.refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token && data.refresh_token) {
          saveTokens(data.access_token, data.refresh_token); // Сохраняем новые токены
        } else {
          console.error("Ошибка при обновлении токенов:", data);
        }
      })
      .catch((error) => console.error("Ошибка при обновлении токенов:", error));
  };

  return (
    <AuthContext.Provider
      value={{ tokens, saveTokens, clearTokens, refreshTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста
export const useAuth = () => useContext(AuthContext);
