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
import { RegistrationApiProvider } from "./States/RegistrationApi.js";

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
  const BackButton = tg?.BackButton;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [habitationData, setHabitationData] = useState(null);
  const [personalLifeData, setPersonalLifeData] = useState(null);
  const [familyData, setFamilyData] = useState(null);
  const [prefersData, setPrefersData] = useState(null);

  const handlePersonalLifeData = (data) => {
    setPersonalLifeData(data);
    console.log("Данные из PersonLife:", data);
  };

  const handlePrefersData = (data) => {
    setPrefersData(data);
    console.log("Данные из преферс:", data);
  };

  const handleFamilyData = (data) => {
    setFamilyData(data);
    console.log("Данные из семи:", data);
  };

  const handleHabitationData = (data) => {
    setHabitationData(data);
    console.log("Данные из habitation:", data);
  };

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.MainButton.text = "Создать профиль";
      tg.MainButton.show();

      if (BackButton) {
        BackButton.show();
        BackButton.onClick(() => {
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
      <AppRoot>
        <Router>
          <RegistrationApiProvider>
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
                element={<PersonLife onSendData={handlePersonalLifeData} />}
              />
              <Route
                path="/family"
                element={<Family onSendData={handleFamilyData} />}
              />
              <Route
                path="/habitation"
                element={<Habitation onSendData={handleHabitationData} />}
              />
              <Route
                path="/preferences"
                element={<Preferences onSendData={handlePrefersData} />}
              />
            </Routes>

            {isModalOpen && (
              <EndOfRegistrationWithModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
              />
            )}

            <TelegramNavButton
              openModal={openModal}
              isModalOpen={isModalOpen}
              personalLifeData={personalLifeData}
              habitationData={habitationData}
              prefersData={prefersData}
              familyData={familyData}
            />
          </RegistrationApiProvider>
        </Router>
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

const TelegramNavButton = ({
  openModal,
  isModalOpen,
  personalLifeData,
  habitationData,
  prefersData,
  familyData,
}) => {
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const location = useLocation();
  const tg = window.Telegram?.WebApp;
  const { registrationData } = useRegistrationData();
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);
  useEffect(() => {
    if (familyData) {
      handleFamilySubmit();
    }
  }, [familyData]);
  useEffect(() => {
    if (prefersData) {
      handlePrefersSubmit();
    }
  }, [prefersData]);
  useEffect(() => {
    if (habitationData) {
      handleHabitationSubmit();
    }
  }, [habitationData]);
  useEffect(() => {
    if (personalLifeData) {
      handlePersonalLifeSubmit();
    }
  }, [personalLifeData]);

  const handleFinalSubmit = async () => {
    // const dataToSend = {
    //   ...registrationData,
    //   habitation: habitationData || {},
    //   personalLife: personalLifeData || {},
    // };

    // console.log("Данные для отправки:", dataToSend);

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

  const handlePersonalLifeSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personalLifeData || {}),
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
      // console.log("Данные успешно отправлены:", result);
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
    }
  };

  const handleHabitationSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitationData || {}),
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
      // console.log("Данные успешно отправлены:", result);
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
    }
  };

  const handleFamilySubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(familyData || {}),
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
      // console.log("Данные успешно отправлены:", result);
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
    }
  };

  const handlePrefersSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prefersData || {}),
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
      // console.log("Данные успешно отправлены:", result);
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
            setIsSettingsLoaded(false);
            break;
          case "/person-life":
            handlePersonalLifeSubmit();
            break;
          case "/habitation":
            handleHabitationSubmit();
            break;
          case "/family":
            handleFamilySubmit();
            break;
          case "/preferences":
            handlePrefersSubmit();
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
        openModal();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [location, openModal, isModalOpen]);

  return null;
};

export default App;
