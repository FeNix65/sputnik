import { createContext, useContext, useState } from "react";

const RegistrationDataContext = createContext();
export const useRegistrationData = () => useContext(RegistrationDataContext);
// Провайдер контекста
export const RegistrationDataProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({});

  return (
    <RegistrationDataContext.Provider
      value={{ registrationData, setRegistrationData }}
    >
      {children}
    </RegistrationDataContext.Provider>
  );
};

// // Хук для использования контекста
// export const useRegistrationData = () => {
//   return useContext(RegistrationDataContext);
// };
