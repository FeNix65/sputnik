import React, { createContext, useContext } from "react";

const RegistrationApi = createContext();

export const RegistrationApiProvider = ({ children, value }) => {
  return (
    <RegistrationApi.Provider value={value}>
      {children}
    </RegistrationApi.Provider>
  );
};

export const useData = () => useContext(RegistrationApi);
