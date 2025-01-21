import React, { useState, useEffect } from "react";
import {
  Radio,
  Cell,
  Input,
  Section,
  List,
  Button,
  Divider,
  Modal,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/GeneralStyle.css";
import config from "../config.js"; // Исправлено: сonfig на config
import { useRegistrationData } from "../States/RegistrationData";
import { useData } from "../States/RegistrationApi";
const GeneralInfo = ({ onSubmit }) => {
  // const { tokens } = useTokens();
  const { cities } = useData(); // Получаем города из контекста
  const { registrationData, setRegistrationData } = useRegistrationData();
  const [first_name, setFirstName] = useState(null);
  const [short_description, setShortDescription] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState(null);
  const [city, setCity] = useState("");
  // const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const fetchData = async (url, setter, mapper = (data) => data) => {
  //   try {
  //     const response = await fetch(url);
  //     const result = await response.json();
  //     if (result.ok) {
  //       setter(mapper(result));
  //     } else {
  //       console.error("Неверный ответ сервера", result);
  //     }
  //   } catch (error) {
  //     console.error(`Ошибка при запросе ${url}: `, error);
  //   }
  // };

  // useEffect(() => {
  //   // Загружаем города с сервера
  //   fetchData(`${config.serverUrl}api/server.getCities`, (data) =>
  //     setCities(data.cities)
  //   );
  // }, []);

  // Функция для сохранения данных регистрации
  const handleSave = () => {
    setRegistrationData({
      ...registrationData,

      first_name,
      short_description,
      gender,
      date_of_birth: Math.floor(new Date(dateOfBirth).getTime() / 1000),
      city_id: city.id,
    });
  };

  // Подготовка данных перед отправкой
  // const prepareData = () => {
  //   const birthDate = new Date(dateOfBirth);
  //   const birthYear = birthDate.getFullYear();
  //   const currentDate = new Date();
  //   const age = currentDate.getFullYear() - birthYear;

  //   if (birthYear < 1900 || age < 16) {
  //     alert(
  //       "Дата рождения должна быть после 1900 года и вам должно быть больше 16 лет."
  //     );
  //     return null;
  //   }

  //   return {
  //     first_name: firstName,
  //     short_description: shortDescription,
  //     gender,
  //     date_of_birth: Math.floor(new Date(dateOfBirth).getTime() / 1000),
  //     city,
  //   };
  // };

  const handleSubmit = () => {
    const data = {};
    // console.log("Отправляемые данные:", data);
    if (data) {
      // Сохраняем данные в контексте
      handleSave();
      if (onSubmit) onSubmit(data);
    }
  };

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
      <Section header="Общая информация">
        <Input
          placeholder="Имя"
          // value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Divider />
        <Input
          placeholder="Напишите о себе (максимум 256 символов)"
          value={short_description}
          maxLength={256}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </Section>

      <Section footer="В анкете будет отображаться только ваш возраст">
        <Input
          type="date"
          placeholder="Дата рождения"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <Modal
          style={{ minHeight: 400 }}
          header={<Modal.Header>Выберите город</Modal.Header>}
          trigger={
            <Cell id="city" onClick={() => setIsModalOpen(true)}>
              {city.name || "Выберите город"}
            </Cell>
          }
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Input
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Section>
            {(Array.isArray(cities) ? cities : [])
              .filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((filteredCity) => (
                <Cell
                  key={filteredCity.id}
                  onClick={() => {
                    setCity({ id: filteredCity.id, name: filteredCity.name });
                    setIsModalOpen(false);
                  }}
                >
                  {filteredCity.name}
                </Cell>
              ))}
          </Section>
        </Modal>
      </Section>

      <Section header="Выберите ваш пол">
        <Cell
          Component="label"
          onChange={() => setGender("male")}
          before={
            <Radio name="gender" value="male" checked={gender === "male"} />
          }
        >
          Мужской
        </Cell>
        <Cell
          Component="label"
          onChange={() => setGender("female")}
          before={
            <Radio name="gender" value="female" checked={gender === "female"} />
          }
        >
          Женский
        </Cell>
      </Section>
      {/* <Button onClick={handleSubmit}>Создать профиль</Button> */}
    </List>
  );
};

export default GeneralInfo;
