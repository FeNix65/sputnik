import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoot } from "@telegram-apps/telegram-ui";
import NavigationBar from "./components/NavigationBar";

import StartScreen from "./pages/StartScreen";
import Steps from "./components/Steps";
import Acord from "./pages/Education";
import Btn from "./components/CustomButton";
import EndOfRegButton from "./components/EndOfRegButton";
import SubRegButton from "./components/SubRegButton";
import SkipButton from "./components/SkipButton";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import GeneralInfo from "./pages/GeneralInfo";
import EducationPage from "./pages/Education";
import EndOfRegistration from "./pages/EndOfRegistration";
import Habitation from "./pages/Habitation";
import PersonalLife from "./pages/PersonLife";
import Preferences from "./pages/Preferences";
import Family from "./pages/Family";
import ExternalFeatures from "./pages/ExternalFeatures";

function App() {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();

    return (
      <AppRoot
        style={{
          background: "var(--tgui--secondary_bg_color)",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <NavigationBar />
        </Router> */}
        {/* <Ss/> */}

        {/* компоненты верха страницы */}
        {/* <Settings /> */}

        {/* <Steps /> */}

        {/* сами страницы */}
        {/* <StartScreen/> */}
        <GeneralInfo />
        {/* <EducationPage /> */}
        {/* <ExternalFeatures /> */}
        {/* <EndOfRegistration /> */}
        {/* <PersonalLife /> */}
        {/* <Family /> */}
        {/* <Habitation /> */}
        {/* <Preferences /> */}
        {/* < Анкеты сюда/> */}

        {/* Компоненты низа страницы */}

        <Btn />
        {/* <EndOfRegButton /> */}
        <SubRegButton />
      </AppRoot>
    );
  }

  return (
    <div>
      <h1>Ошибка: Telegram WebApp недоступен</h1>
    </div>
  );
}

export default App;

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
