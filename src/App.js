import React from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import StartScreen from './pages/StartScreen';

function App() {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();

    return (
      <AppRoot>
        <StartScreen />
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
