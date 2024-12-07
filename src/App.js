import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoot } from "@telegram-apps/telegram-ui";
import NavigationBar from "./components/NavigationBar";

<<<<<<< HEAD
import StartScreen from "./pages/StartScreen";
=======
import Ss from "./pages/StartScreen";
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
import Steps from "./components/Steps";
import Acord from "./pages/Education";
import Btn from "./components/CustomButton";
import EndOfRegButton from "./components/EndOfRegButton";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import GeneralInfo from "./pages/GeneralInfo";
import EducationPage from "./pages/Education";
import EndOfRegistration from "./pages/EndOfRegistration";
<<<<<<< HEAD
import Habitation from "./pages/Habitation";
=======
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0

function App() {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();

    return (
<<<<<<< HEAD
      <AppRoot style={{ background: 'var(--tgui--secondary_bg_color)', width: "100vw", height:"100vh",}}>
=======
      <AppRoot>
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
        {/* <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <NavigationBar />
        </Router> */}
<<<<<<< HEAD
        {/* <StartScreen/> */}
        {/* <Steps /> */}
=======
        {/* <Ss/> */}
        <Steps />
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
        {/* <GeneralInfo /> */}
        {/* <EducationPage/> */}
        {/* <Acord /> */}
        {/* <Settings/> */}
<<<<<<< HEAD
        {/* <Habitation /> */}
        <Btn />
        {/* <EndOfRegistration />
        <EndOfRegButton /> */}
=======
        <EndOfRegistration />
        {/* <Btn /> */}
        <EndOfRegButton />
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
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
