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
<<<<<<< HEAD
  Divider
} from "@telegram-apps/telegram-ui";
// import "../assets/styles/MainStyles.css";
// import "../assets/styles/Preferences.css";

const Preferences = () => {
  return (
    <List className="List">
=======
} from "@telegram-apps/telegram-ui";
import "../assets/styles/Preferences.css";

const Preferences = () => {
  return (
    <List>
>>>>>>> 51ba4a7a40b123bcc0b7653b75c500c6277855c9
      <Section header=" Предпочтения">
        <Select placeholder="Религия" name="религия" defaultValue="">
          <option value="" disabled hidden>
            Религия
          </option>
          <option>Иудаизм</option>
          <option>Православие</option>
          <option>Католицизм</option>
          <option>Протестантизм</option>
          <option>Ислам</option>
          <option>Буддизм</option>
          <option>Конфуцианство</option>
          <option>Светский гуманизм</option>
          <option>Пастафарианство</option>
        </Select>
<<<<<<< HEAD
        <Divider />
        <Select
          placeholder="Предпочтительный семейный строй"
          name="семейный строй"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Cемейный строй
          </option>
          <option>Традиционная</option>
          <option>Нетрадиционная</option>
          <option>Совместное проживание</option>
          <option>Одиночество</option>
        </Select>
      </Section>
      <Divider />
      <Section
        header="Прочая информация"
        footer="Например: Блогер-самоучка, люблю лошадей"
      >
        <Input placeholder="Ваши увлечения и хобби" />
      </Section>
    </List>
  );
};

export default Preferences;
=======

        <Select
          placeholder="Предпочтительный семейный строй"
          name="семейный строй"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Cемейный строй
          </option>
          <option>Традиционная</option>
          <option>Нетрадиционная</option>
          <option>Совместное проживание</option>
          <option>Одиночество</option>
        </Select>
      </Section>

      <Section
        header="Прочая информация"
        footer="Например: Блогер-самоучка, люблю лошадей"
      >
        <Input placeholder="Ваши увлечения и хобби" />
      </Section>
    </List>
  );
};

export default Preferences;
>>>>>>> 51ba4a7a40b123bcc0b7653b75c500c6277855c9
