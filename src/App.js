import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppRoot, Button } from "@telegram-apps/telegram-ui";

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
    }
  }, [tg]);

  return (
    <AppRoot style={{ background: "var(--tgui--secondary_bg_color)" }}>
      <Router>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/general-info" element={<PageWithSteps page="general-info" />} />
          <Route path="/education" element={<PageWithSteps page="education" />} />
          <Route path="/external-features" element={<PageWithSteps page="external-features" />} />
          <Route path="/end-of-registration" element={<PageWithSteps page="end-of-registration" />} />
          <Route path="/person-life" element={<PageWithSteps page="person-life" />} />
          <Route path="/family" element={<PageWithSteps page="family" />} />
          <Route path="/habitation" element={<PageWithSteps page="habitation" />} />
          <Route path="/preferences" element={<PageWithSteps page="preferences" />} />
          
          <Route
            path="/modal"
            element={
              <EndOfRegistrationWithModal isModalOpen={isModalOpen} closeModal={closeModal} />
            }
          />
        </Routes>
        <TelegramNavButton openModal={openModal} />
      </Router>
    </AppRoot>
  );
}

// Обертка для страниц
const PageWithSteps = ({ page }) => {
  const stepsMapping = {
    "general-info": 1,
    "education": 2,
    "external-features": 3,
    "end-of-registration": 4,
  };

  const handleSubmit = (data) => {
    console.log("Отправка данных:", data);
  };

  return (
    <div>
      <StepsPanel progress={stepsMapping[page]} />
      {page === "general-info" && <GeneralInfo />}
      {page === "education" && <EducationPage onSubmit={handleSubmit}/>}
      {page === "external-features" && <ExternalFeatures />}
      {page === "end-of-registration" && <EndOfRegistration />}
      {page === "person-life" && <PersonLife />}
      {page === "family" && <Family />}
      {page === "habitation" && <Habitation />}
      {page === "preferences" && <Preferences />}
    </div>
  );
};

// Кнопка Telegram для навигации
const TelegramNavButton = ({ openModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (tg) {
      tg.MainButton.onClick(() => {
        switch (location.pathname) {
          case "/":
            navigate("/general-info");
            break;
          case "/general-info":
            navigate("/education");
            break;
          case "/education":
            const event = new CustomEvent("education-submit");
            window.dispatchEvent(event); 
            navigate("/external-features");
            break;
          case "/external-features":
            navigate("/end-of-registration");
            break;
          case "/end-of-registration":
            navigate("/person-life");
            break;
          case "/person-life":
            navigate("/family");
            break;
          case "/family":
            navigate("/habitation");
            break;
          case "/habitation":
            navigate("/preferences");
            break;
          case "/preferences":
            navigate("/modal");
            break;
            case "/modal":
            openModal("/modal");
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






  // import React from "react";
  // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  // import { AppRoot } from "@telegram-apps/telegram-ui";
  // import NavigationBar from "./components/NavigationBar";

  // import StartScreen from "./pages/StartScreen";
  // import Steps from "./components/Steps";
  // import Acord from "./pages/Education";
  // import Btn from "./components/CustomButton";
  // import EndOfRegButton from "./components/EndOfRegButton";
  // import SubRegButton from "./components/SubRegButton";

  // import Home from "./pages/Home";
  // import Search from "./pages/Search";
  // import Settings from "./pages/Settings";
  // import GeneralInfo from "./pages/GeneralInfo";
  // import EducationPage from "./pages/Education";
  // import EndOfRegistration from "./pages/EndOfRegistration";
  // import PersonLife from "./pages/PersonLife";
  // import Habitation from "./pages/Habitation"
  // import ExternalFeatures from "./pages/ExternalFeatures"
  // import Preferences from "./pages/Preferences"

  // function App() {
  //   if (window.Telegram?.WebApp) {
  //     const tg = window.Telegram.WebApp;
  //     tg.ready();

  //     return (
  //       <AppRoot
  //         style={{
  //           background: "var(--tgui--secondary_bg_color)",
  //           width: "100vw",
  //           height: "100vh",
  //         }}
  //       >
  //         {/* <Router>
  //           <Routes>
  //             <Route path="/" element={<Home />} />
  //             <Route path="/search" element={<Search />} />
  //             <Route path="/settings" element={<Settings />} />
  //           </Routes>
  //           <NavigationBar />
  //         </Router> */}
  //         {/* <Ss/> */}
  //         <Steps />
  //         {/* <GeneralInfo /> */}
  //         {/* <EducationPage/> */}
  //         {/* <Acord /> */}
  //         {/* <Settings/> */}
  //         {/* <EndOfRegistration /> */}
  //         {/* <PersonLife />  */}
  //         {/* <Habitation /> */}
  //         {/* <ExternalFeatures /> */}
  //         <Preferences /> 
  //         {/* <Btn /> */}
  //         {/* <EndOfRegButton /> */}
  //       </AppRoot>
  //     );
  //   }

  //   return (
  //     <div>
  //       <h1>Ошибка: Telegram WebApp недоступен</h1>
  //     </div>
  //   );
  // }

  // export default App;

  // import React from 'react';
  // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  // import NavigationBar from './components/NavigationBar';
  // import '@telegram-apps/telegram-ui/dist/styles.css';
  // import Home from './pages/Home';
  // import Search from './pages/Search';
  // import Settings from './pages/Settings';

  // function App() {
  //   const tg = window.Telegram?.WebApp;
  //   tg?.ready();

  //   return (
  //     <Router>
  //       <div className="app">
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/search" element={<Search />} />
  //           <Route path="/settings" element={<Settings />} />
  //         </Routes>
  //         <NavigationBar />
  //       </div>
  //     </Router>
  //   );
  // }

  // export default App;
