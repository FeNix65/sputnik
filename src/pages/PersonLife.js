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
import "../assets/styles/PersonalLife.css";

const PersonalLife = () => {
  return (
    <List
      style={{
        background: "var(--tgui--secondary_bg_color)",
        padding: "15px",
        height: 600,
      }}
    >
      <Headline level="1" weight="1">
        Личная жизнь
      </Headline>
      <Section header="БЫЛИ ЛИ У ВАС ОТНОШЕНИЯ"></Section>
      <form className="relationships">
        <Section>
          <Cell
            className="relationships__item"
            before={<Radio name="radio" value="NO" />}
          >
            Нет
          </Cell>
        </Section>
        <Section>
          <Cell
            className="relationships__item"
            before={<Radio name="radio" value="YES" />}
          >
            Да
          </Cell>
        </Section>
      </form>
    </List>
  );
};

export default PersonalLife;
