
import React, { useState } from "react";
import {
  Radio,
  Cell,
  Input,
  Section,
  List,
  Button,
  Divider
} from "@telegram-apps/telegram-ui";

const GeneralInfo = ({ onSendData }) => {
  const [firstName, setFirstName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const prepareData = () => {
    // Проверка даты рождения
    const birthDate = new Date(dateOfBirth);
    const birthYear = birthDate.getFullYear();
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthYear;

    if (
      birthYear < 1900 ||
      age < 16 ||
      (age === 16 &&
        currentDate <
          new Date(birthDate.setFullYear(birthDate.getFullYear() + 16)))
    ) {
      alert(
        "Дата рождения должна быть после 1900 года, и вам должно быть больше 16 лет."
      );
      return null;
    }

    return {
      first_name: firstName,
      short_description: shortDescription,
      gender: gender,
      date_of_birth: Math.floor(new Date(dateOfBirth).getTime() / 1000), // UNIX формат
    };
  };

  return (
    <List className="List">
      <div
    style={{
      background: 'var(--tgui--bg_color)'
    }}
  >
    <Cell>
      Divider is under
    </Cell>
    <Divider />
    <Cell>
      Divider is above
    </Cell>
  </div>
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
      </Section>
      <Section header="Выберите ваш пол">
        <Cell
          className="gender__item"
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
          className="gender__item"
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
      <Button onClick={() => onSendData(prepareData())}>
        Тестовая отправка
      </Button>
    </List>
  );
};

export default GeneralInfo;
