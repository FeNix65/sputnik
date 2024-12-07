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
  return (
    <List
      style={{
<<<<<<< HEAD
        // background: "var(--tgui--secondary_bg_color)",
        // padding: "15px",
        // height: 600,
=======
        background: "var(--tgui--secondary_bg_color)",
        padding: "15px",
        height: 600,
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
      }}
    >
      <Headline level="1" weight="1">
        Общая информация
      </Headline>
      <Input placeholder="Имя" />
      <Section footer="Например: Музыкант, играю на нервах бывшей. Ищу себе девушку для ролевых игр.">
        <Textarea placeholder="Напишите о себе..." />
      </Section>
      <Select
<<<<<<< HEAD
=======
        header="Select"
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
        placeholder="I am usual input, just leave me alone"
        className="firstSelect"
      >
        <option>Дата рождения</option>
        <option>Okay</option>
      </Select>
      <Select
<<<<<<< HEAD
=======
        header="Select"
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
        placeholder="I am usual input, just leave me alone"
      >
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
