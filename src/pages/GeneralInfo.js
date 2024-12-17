import React, { useState } from "react";
import {
  Radio,
  Cell,
  Caption,
  Select,
  Headline,
  Textarea,
  Accordion,
  Subheadline,
  List,
  Section,
  Multiselect,
  Input,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/GeneralInfo.css";

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
    </List>
  );
};

export default GeneralInfo;
