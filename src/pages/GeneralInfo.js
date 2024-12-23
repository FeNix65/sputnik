
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

<<<<<<< HEAD
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
=======
const GeneralInfo = () => {
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  return (
    <List
      style={
        {
          // background: "var(--tgui--secondary_bg_color)",
          // padding: "15px",
          // height: 600,
        }
      }
    >
      <Section
        header="Общая информация"
        footer="Например: Музыкант, играю на нервах бывшей. Ищу себе девушку для ролевых игр."
      >
        <Input placeholder="Имя" />
        <Input placeholder="Напишите о себе..." />
      </Section>
      <Section>
        <Select>
          <option>Дата рождения</option>
          <option>Okay</option>
        </Select>
      </Section>
      <Select>
        <option>Город проживания</option>
        <option>Okay</option>
      </Select>
      <Section header=" ВЫБЕРИТЕ ВАШ ПОЛ"></Section>
      <form className="gender">
        <Section>
          <Cell
            className="gender__item"
            before={<Radio name="radio" value="male" />}
          >
            Мужской
          </Cell>
        </Section>
        <Section>
          <Cell
            className="gender__item"
            before={<Radio name="radio" value="female" />}
          >
            Женский
          </Cell>
        </Section>
      </form>
>>>>>>> 51ba4a7a40b123bcc0b7653b75c500c6277855c9
    </List>
  );
};

export default GeneralInfo;
