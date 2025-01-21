import React, { createContext, useState, useContext } from "react";

const RegistrationApi = createContext();

export const RegistrationApiProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [studyPlaces, setStudyPlaces] = useState({});
  const [professions, setProfessions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <RegistrationApi.Provider
      value={{
        cities,
        setCities,
        studyPlaces,
        setStudyPlaces,
        professions,
        setProfessions,
        languages,
        setLanguages,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </RegistrationApi.Provider>
  );
};

export const useData = () => useContext(RegistrationApi);
