import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AppRoot, Button } from "@telegram-apps/telegram-ui";
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
import config from "./config.js"; // Исправлено: сonfig на config

function App() {
  const tg = window.Telegram?.WebApp;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.MainButton.text = "Создать профиль";
      tg.MainButton.show();

      // const initData = tg.initData;
    }
  }, [tg]);
  // saveTokens
  //

  return (
    // <AuthProvider>
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

              <Route
                path="/settings"
                element={<PageWithSteps page="settings" />}
              />

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

              {/* <Route
                path="/modal"
                element={
                  <EndOfRegistrationWithModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                  />
                }
              /> */}
            </Routes>
            {isModalOpen && <EndOfRegistrationWithModal isModalOpen={isModalOpen} closeModal={closeModal} />}
            <TelegramNavButton openModal={openModal} />
          </Router>
        </TokenProvider>
      </AppRoot>
    </RegistrationDataProvider>
    // </AuthProvider>
  );
}

// Обертка для страниц
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

// Кнопка Telegram для навигации
const TelegramNavButton = ({ openModal }) => {
  let access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const location = useLocation();
  const tg = window.Telegram?.WebApp;
  const { registrationData } = useRegistrationData();


  const handleFinalSubmit = async () => {
    // Получаем данные из контекста или состояния

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
      // console.log("Данные :", registrationData);
      if (!response.ok) {
        throw new Error("Сеть ответила с ошибкой");
      }

      const result = await response.json(); // Преобразуем ответ в JSON
      console.log("Данные успешно отправлены:", result);
      // Дополнительная логика после успешной отправки
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
    }
  };

  useEffect(() => {
    if (tg) {
      tg.MainButton.onClick(() => {
        switch (location.pathname) {
          case "/":
            navigate("/general-info");
            // const event = new CustomEvent("generalInfo-submit");
            // window.dispatchEvent(event);
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
            // handleNavigateAndOpenModal("/modal");
            // navigate("/modal");
            // EndOfRegistrationWithModal();
            navigate("/settings");
            break;
          // case "/modal":
            
          //   break;  
            
          case "/settings":
            openModal();
            // navigate("/person-life");
            break;
          
            // break;
          case "/person-life":
            // navigate("/family");
            openModal();
            break;
          case "/family":
            // navigate("/habitation");
            openModal();
            break;
          case "/habitation":
            // navigate("/preferences");
            openModal();
            break;
          case "/preferences":
            openModal();
            break;
          
          default:
            tg.MainButton.hide();
        }
      });

      const updateButtonText = () => {
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

          case "/settings":
            tg.MainButton.text = "Настройки";
            break;

          case "/person-life":
            tg.MainButton.text = "Сохранить";
            break;
          case "/habitation":
            tg.MainButton.text = "Сохранить";
            break;
          case "/preferences":
            tg.MainButton.text = "Сохранить";
            break;
          case "/family":
            tg.MainButton.text = "Сохранить";
            break;

          case "/modal":
            tg.MainButton.text = "Пропустить";
            break;
          default:
            tg.MainButton.text = "Продолжить";
        }
        tg.MainButton.show();
      };

      updateButtonText();
    }
  }, [location, navigate, tg, openModal]);

  return null;
};

export default App;
