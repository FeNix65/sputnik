import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoot } from "@telegram-apps/telegram-ui";
import NavigationBar from "./components/NavigationBar";

import Ss from "./pages/StartScreen";
import Steps from "./components/Steps";
import Acord from "./pages/Education";
import Btn from "./components/CustomButton";
import EndOfRegButton from "./components/EndOfRegButton";
import SubRegButton from "./components/SubRegButton";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import GeneralInfo from "./pages/GeneralInfo";
import EducationPage from "./pages/Education";
import EndOfRegistration from "./pages/EndOfRegistration";
import PersonalLife from "./pages/PersonLife";

function App() {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();

    return (
      <AppRoot>
        {/* <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <NavigationBar />
        </Router> */}
        {/* <Ss/> */}
        {/* <Steps /> */}
        <PersonalLife />
        {/* <GeneralInfo /> */}
        {/* <EducationPage/> */}
        {/* <Acord /> */}
        {/* <Settings/> */}
        {/* <EndOfRegistration /> */}
        {/* <Btn /> */}
        <SubRegButton />
        {/* <EndOfRegButton /> */}
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
