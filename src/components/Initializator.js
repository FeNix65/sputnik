import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.js";
// import { useTokens } from "../States/TokenContext";

const Initializator = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const tg = window.Telegram?.WebApp;

  const pingServer = async () => {
    try {
      const response = await fetch(`${config.serverUrl}api/server.ping`, {
        method: "POST",
      });
      console.log(response);
      if (!response.ok) throw new Error("Сервер недоступен");
    } catch (error) {
      setError("Ошибка: Сервер недоступен");
    }
  };

  const getTokens = async () => {
    try {
      const initData = window.Telegram.WebApp.initData;
      const urlParams = new URLSearchParams(initData);
      console.log(
        "url",
        `${config.serverUrl}api/auth.telegram?${urlParams.toString()}`
      );
      const response = await fetch(
        `${config.serverUrl}api/auth.telegram?${urlParams.toString()}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ initData }),
        }
      );

      let data = await response.json();

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    } catch (error) {
      setError(`Ошибка: Не удалось получить токены: ${error}`);
    }
  };

  const getUserInfo = async () => {
    try {
      let access_token = localStorage.getItem("access_token");

      const response = await fetch(`${config.serverUrl}api/users.getMe`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      handleUserState(data.state);
    } catch (error) {
      setError(
        `Ошибка: Не удалось получить информацию о пользователе: ${error}`
      );
      console.error(error);
    }
  };

  const handleUserState = (state) => {
    switch (state) {
      case "unregistered":
        navigate("/create-profile");
        break;
      case "active":
        navigate("/profiles");
        break;
      case "inactive":
        navigate("/profile-deactivated");
        break;
      case "banned":
        navigate("/banned");
        break;
      default:
        setError("Ошибка: Неверное состояние пользователя");
      // tg.close();
    }
  };
  //эта хуйня пригодиться

  //   const refreshToken = async () => {
  //     try {
  //       await fetch("https://example.com/api/auth.refresh");
  //     } catch (error) {
  //       setError("Ошибка: Не удалось обновить токены");
  //     }
  //   };

  useEffect(() => {
    const initializeApp = async () => {
      await pingServer();
      if (!error) await getTokens();
      if (!error) await getUserInfo();
    };

    initializeApp();

    // const refreshTokenInterval = setInterval(() => {
    //   refreshToken();
    // }, 15 * 60 * 1000);

    // return () => clearInterval(refreshTokenInterval);
  }, [error]);

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default Initializator;
