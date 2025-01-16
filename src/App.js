import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AppRoot } from "@telegram-apps/telegram-ui";
import Initializator from "./components/Initializator.js";
import { TokenProvider } from "./States/TokenContext";
import {
  RegistrationDataProvider,
  useRegistrationData,
} from "./States/RegistrationData";

import StartScreen from "./pages/StartScreen";
import GeneralInfo from "./pages/GeneralInfo";
import EducationPage from "./pages/Education";
import ExternalFeatures from "./pages/ExternalFeatures";
import EndOfRegistration from "./pages/EndOfRegistration";
import EndOfRegistrationWithModal from "./components/EndOfRegistrationWithModal";
import StepsPanel from "./components/Steps";
import PersonLife from "./pages/PersonLife";
import Habitation from "./pages/Habitation";
import Preferences from "./pages/Preferences";
import Family from "./pages/Family";
import Settings from "./pages/Settings.js";
import config from "./config.js";

function App() {
  const tg = window.Telegram?.WebApp;
  const BackButton = tg?.BackButton; // Инициализация BackButton
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.MainButton.text = "Создать профиль";
      tg.MainButton.show();

      // Работа с BackButton
      if (BackButton) {
        BackButton.show();
        BackButton.onClick(() => {
          // tg.showAlert("Нет пути назад!");
          BackButton.hide();
        });

        tg.onEvent("backButtonClicked", () => {
          console.log("Back button clicked!");
        });
      }
    }
  }, [tg, BackButton]);

  return (
    <RegistrationDataProvider>
      <AppRoot style={{ background: "var(--tgui--secondary_bg_color)" }}>
        <TokenProvider>
          <Router>
            <Initializator />
            <Routes>
              <Route path="/" element={<StartScreen />} />
              <Route
                path="/general-info"
                element={<PageWithSteps page="general-info" />}
              />
              <Route
                path="/education"
                element={<PageWithSteps page="education" />}
              />
              <Route
                path="/external-features"
                element={<PageWithSteps page="external-features" />}
              />
              <Route
                path="/end-of-registration"
                element={<PageWithSteps page="end-of-registration" />}
              />
              <Route path="/settings" element={<PageWithSteps page="settings" />} />
              <Route
                path="/person-life"
                element={<PageWithSteps page="person-life" />}
              />
              <Route path="/family" element={<PageWithSteps page="family" />} />
              <Route
                path="/habitation"
                element={<PageWithSteps page="habitation" />}
              />
              <Route
                path="/preferences"
                element={<PageWithSteps page="preferences" />}
              />
            </Routes>
            {isModalOpen && (
              <EndOfRegistrationWithModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
              />
            )}
            <TelegramNavButton openModal={openModal} isModalOpen={isModalOpen} />
          </Router>
        </TokenProvider>
      </AppRoot>
    </RegistrationDataProvider>
  );
}

const PageWithSteps = ({ page }) => {
  const stepsMapping = {
    "general-info": 1,
    education: 2,
    "external-features": 3,
    "end-of-registration": 4,
    settings: 5,
  };

  return (
    <div>
      <StepsPanel progress={stepsMapping[page]} />
      {page === "general-info" && <GeneralInfo />}
      {page === "education" && <EducationPage />}
      {page === "external-features" && <ExternalFeatures />}
      {page === "end-of-registration" && <EndOfRegistration />}
      {page === "settings" && <Settings />}
      {page === "person-life" && <PersonLife />}
      {page === "family" && <Family />}
      {page === "habitation" && <Habitation />}
      {page === "preferences" && <Preferences />}
    </div>
  );
};

const TelegramNavButton = ({ openModal, isModalOpen }) => {
  let access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const location = useLocation();
  const tg = window.Telegram?.WebApp;
  const { registrationData } = useRegistrationData();
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false); // Состояние для загрузки

  const handleFinalSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    };

    try {
      const response = await fetch(
        `${config.serverUrl}api/users.editProfile`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Сеть ответила с ошибкой");
      }
      const result = await response.json();
      console.log("Данные успешно отправлены:", result);
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
    }
  };

  useEffect(() => {
    if (tg) {
      tg.MainButton.onClick(() => {
        if (isModalOpen) return;

        switch (location.pathname) {
          case "/":
            navigate("/general-info");
            break;
          case "/general-info":
            navigate("/education");
            break;
          case "/education":
            navigate("/external-features");
            break;
          case "/external-features":
            navigate("/end-of-registration");
            break;
          case "/end-of-registration":
            handleFinalSubmit();
            navigate("/settings");
            setIsSettingsLoaded(false); // Устанавливаем загрузку
            break;
          default:
            tg.MainButton.hide();
        }
      });

      const updateButtonText = () => {
        if (isModalOpen) {
          tg.MainButton.hide();
          return;
        }

        switch (location.pathname) {
          case "/":
            tg.MainButton.text = "Создать профиль";
            break;
          case "/general-info":
          case "/education":
            tg.MainButton.text = "Продолжить";
            break;
          case "/external-features":
            tg.MainButton.text = "Пропустить";
            break;
          case "/end-of-registration":
            tg.MainButton.text = "Завершить регистрацию";
            break;
          default:
            tg.MainButton.text = "Сохранить";
        }
        tg.MainButton.show();
      };

      updateButtonText();
    }
  }, [location, navigate, tg, openModal, isModalOpen]);

  useEffect(() => {
    if (location.pathname === "/settings" && !isModalOpen) {
      const timeout = setTimeout(() => {
        setIsSettingsLoaded(true);
        openModal(); // Открываем модалку
      }, 100); // Время загрузки

      return () => clearTimeout(timeout); // Очищаем таймер
    }
  }, [location, openModal, isModalOpen]);

  return null;
};

export default App;
