import React, { useState } from "react";
import {
  Select,
  Input,
  Divider,
  Button,
  Section,
  List,
} from "@telegram-apps/telegram-ui";

const Preferences = ({ onSendData }) => {
  const [religion, setReligion] = useState("");
  const [familyStructure, setFamilyStructure] = useState("");
  const [hobbies, setHobbies] = useState("");

  const religionMap = {
    Крестьянство: "christianity",
    Ислам: "islam",
    Индуизм: "hinduism",
    Буддизм: "buddhism",
    Иудаизм: "judaism",
    Отсутствует: "none",
  };

  const familyMap = {
    "Патриархальная семья": "patriarchal_family",
    "Матриархальная семья": "matriarchal_family",
    "Эгалитарная семья": "egalitarian_family",
    Отсутствует: "none",
  };

  const prepareData = () => {
    return {
      religion: religionMap[religion] || "",
      familyStructure: familyMap[familyStructure] || "",
      hobbies,
    };
  };

  const handleSubmit = () => {
    const data = prepareData();
    console.log("Отправляемые данные:", data);
    // onSendData(data);
  };

  return (
    <List className="List">
      <Section header="Предпочтения">
        <Select
          placeholder="Религия"
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
        >
          <option value="" disabled hidden>
            Религия
          </option>
          <option>Крестьянство</option>
          <option>Ислам</option>
          <option>Индуизм</option>
          <option>Буддизм</option>
          <option>Иудаизм</option>
          <option>Отсутствует</option>
        </Select>
        <Divider />
        <Select
          placeholder="Предпочтительный семейный строй"
          value={familyStructure}
          onChange={(e) => setFamilyStructure(e.target.value)}
        >
          <option value="" disabled hidden>
            Семейный строй
          </option>
          <option>Патриархальная семья</option>
          <option>Матриархальная семья</option>
          <option>Эгалитарная семья</option>
          <option>Отсутствует</option>
        </Select>
      </Section>
      <Divider />
      <Section
        header="Прочая информация"
        footer="Например: Блогер-самоучка, люблю лошадей"
      >
        <Input
          placeholder="Ваши увлечения и хобби"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
        />
      </Section>
      <Button onClick={handleSubmit}>тестим</Button>
    </List>
  );
};

export default Preferences;
