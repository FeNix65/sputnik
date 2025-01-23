import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  List,
  Section,
  Multiselect,
  Input,
  Cell,
  Modal,
  Button,
} from "@telegram-apps/telegram-ui";
import config from "../config.js";
import { useRegistrationData } from "../States/RegistrationData";
import "../assets/styles/GeneralStyle.css";

const EducationPage = ({ onSubmit }) => {
  const { registrationData, setRegistrationData } = useRegistrationData();
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const [studyPlaces, setStudyPlaces] = useState({});
  const [selectedStudyPlace, setSelectedStudyPlace] = useState(null);
  const [searchStudyPlace, setSearchStudyPlace] = useState("");
  const [isStudyPlaceModalOpen, setIsStudyPlaceModalOpen] = useState(false);

  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [searchProfession, setSearchProfession] = useState("");
  const [isProfessionModalOpen, setIsProfessionModalOpen] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [languagesTouched, setLanguagesTouched] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [otherInfo, setOtherInfo] = useState(null);

  const handleAccordionChange = useCallback((id) => {
    setExpandedAccordion((prev) => (prev === id ? null : id));
  }, []);

  const fetchData = useCallback(
    async (url, setter, mapper = (data) => data) => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (result.ok) {
          setter(mapper(result));
        } else {
          console.error("Неверный ответ сервера", result);
        }
      } catch (error) {
        console.error(`Ошибка при запросе ${url}: `, error);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(`${config.serverUrl}api/server.getStudyPlaces`, (data) =>
      setStudyPlaces(data.study_places || {})
    );
    fetchData(`${config.serverUrl}api/server.getProfessions`, (data) =>
      setProfessions(
        data.professions.map((name, index) => ({ id: index, name }))
      )
    );
    fetchData(`${config.serverUrl}api/server.getLangs`, (data) =>
      setLanguages(
        data.languages.map((lang) => ({ value: lang.id, label: lang.name }))
      )
    );
  }, [fetchData]);

  const handleSave = useCallback(() => {
    setRegistrationData({
      ...registrationData,
      speciality: {
        profession: selectedProfession,
        place_of_study: selectedStudyPlace,
        languages: languagesTouched
          ? selectedLanguages.length > 0
            ? selectedLanguages.map((lang) => lang.value)
            : []
          : null,
        other_info: otherInfo,
      },
    });
  }, [
    registrationData,
    selectedProfession,
    selectedStudyPlace,
    selectedLanguages,
    languagesTouched,
    otherInfo,
    setRegistrationData,
  ]);

  const handleSubmit = useCallback(() => {
    const data = {
      // speciality: {
      //   profession: selectedProfession,
      //   place_of_study: selectedStudyPlace,
      //   languages: selectedLanguages.map((lang) => lang.value),
      //   other_info: otherInfo,
      // },
    };
    handleSave();
    if (onSubmit) onSubmit(data);
  }, [
    handleSave,
    selectedProfession,
    selectedStudyPlace,
    selectedLanguages,
    otherInfo,
    onSubmit,
  ]);

  useEffect(() => {
    const mainButton = window.Telegram.WebApp.MainButton;

    mainButton.onClick(handleSubmit);
    mainButton.show();

    return () => {
      mainButton.offClick(handleSubmit);
    };
  }, [handleSubmit]);

  return (
    <List className="list">
      <Section header="Специализация">
        <Modal
          style={{
            height: 400,
          }}
          header={<Modal.Header>Выберите профессию</Modal.Header>}
          trigger={
            <Cell
              id="profession"
              onClick={() => setIsProfessionModalOpen(true)}
            >
              {selectedProfession || "Профессия"}
            </Cell>
          }
          open={isProfessionModalOpen}
          onClose={() => setIsProfessionModalOpen(false)}
        >
          <Input
            placeholder="Поиск"
            value={searchProfession}
            onChange={(e) => setSearchProfession(e.target.value)}
          />
          <Section>
            {professions
              .filter((p) =>
                p.name.toLowerCase().includes(searchProfession.toLowerCase())
              )
              .map((filteredProfession) => (
                <Cell
                  key={filteredProfession.id}
                  onClick={() => {
                    setSelectedProfession(filteredProfession.name);
                    setIsProfessionModalOpen(false);
                  }}
                >
                  {filteredProfession.name}
                </Cell>
              ))}
          </Section>
        </Modal>

        <Modal
          header={<Modal.Header>Выберите место обучения</Modal.Header>}
          trigger={
            <Cell
              id="study-place"
              onClick={() => setIsStudyPlaceModalOpen(true)}
            >
              {selectedStudyPlace || "Место обучения"}
            </Cell>
          }
          open={isStudyPlaceModalOpen}
          onClose={() => setIsStudyPlaceModalOpen(false)}
        >
          <Input
            placeholder="Поиск"
            value={searchStudyPlace}
            onChange={(e) => setSearchStudyPlace(e.target.value)}
          />
          <Section>
            {Object.keys(studyPlaces).map((city) => (
              <Accordion
                key={city}
                id={city}
                title={city}
                expanded={expandedAccordion === city}
                onChange={() => handleAccordionChange(city)}
              >
                {studyPlaces[city]
                  .filter((place) =>
                    place.toLowerCase().includes(searchStudyPlace.toLowerCase())
                  )
                  .map((place, index) => (
                    <Cell
                      key={index}
                      onClick={() => {
                        setSelectedStudyPlace(place);
                        setIsStudyPlaceModalOpen(false);
                      }}
                    >
                      {place}
                    </Cell>
                  ))}
              </Accordion>
            ))}
          </Section>
        </Modal>
      </Section>

      <Section header="Языки">
        <Multiselect
          options={languages}
          value={selectedLanguages}
          onChange={(options) => {
            setSelectedLanguages(options);
            setLanguagesTouched(true);
          }}
          sectionHeader="Выберите из доступных вариантов"
          placeholder="Выберите языки"
          selectedBehavior="highlight"
        />
      </Section>

      <Section header="Прочая информация">
        <Input
          placeholder="Специальность, опыт работы в прошлом"
          value={otherInfo}
          onChange={(e) => setOtherInfo(e.target.value)}
        />
      </Section>
    </List>
  );
};

export default EducationPage;
