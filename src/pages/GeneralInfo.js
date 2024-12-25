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
import { useAuth } from "../AuthContext";

const GeneralInfo = ({ onSendData }) => {
  const { tokens } = useAuth();
  // tokens

  const [firstName, setFirstName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://example.com/api/server.getCities") // Подставьте актуальный URL
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error("Ошибка загрузки городов:", error));
  }, []);

  const prepareData = () => {
    const birthDate = new Date(dateOfBirth);
    const birthYear = birthDate.getFullYear();
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthYear;

    if (birthYear < 1900 || age < 16) {
      alert(
        "Дата рождения должна быть после 1900 года и вам должно быть больше 16 лет."
      );
      return null;
    }

    return {
      first_name: firstName,
      short_description: shortDescription,
      gender: gender,
      date_of_birth: Math.floor(new Date(dateOfBirth).getTime() / 1000),
      city: city,
    };
  };

  useEffect(() => {
    const submitHandler = () => {
      const data = prepareData();
      if (data) {
        console.log("Отправляемые данные:", data); // Выводим данные в консоль
        onSendData(data);
      }
    };

    window.addEventListener("generalInfo-submit", submitHandler);
    return () => {
      window.removeEventListener("generalInfo-submit", submitHandler);
    };
  }, [onSendData]);

  return (
    <List className="list">
      <Section header="Общая информация">
        <Input
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Divider />
        <Input
          placeholder="Напишите о себе (максимум 256 символов)"
          value={shortDescription}
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
          header={<Modal.Header>Выберите город</Modal.Header>}
          trigger={
            <Cell size="m" onClick={() => setIsModalOpen(true)}>
              {city || "Выберите город"}
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
            {cities
              .filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((filteredCity) => (
                <Cell
                  key={filteredCity.id}
                  onClick={() => setCity(filteredCity.name)}
                >
                  {filteredCity.name}
                </Cell>
              ))}
          </Section>
        </Modal>
      </Section>

      <Section header="Выберите ваш пол">
        <Cell
          before={
            <Radio
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
          }
        >
          Мужской
        </Cell>
        <Cell
          before={
            <Radio
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
          }
        >
          Женский
        </Cell>
      </Section>

      {/* Кнопка для тестовой отправки */}
      <Button onClick={() => onSendData(prepareData())}>
        Тестовая отправка
      </Button>
    </List>
  );
};

export default GeneralInfo;
