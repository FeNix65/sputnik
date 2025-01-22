import React, { useState } from "react";
import {
  Select,
  Input,
  Divider,
  Button,
  Section,
  List,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/GeneralStyle.css";

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

  const handleSave = () => {
    const data = {
      prefers: {
        religion: religionMap[religion] || "",
        family_build_status: familyMap[familyStructure] || "",
        other_info,
      },
    };
    return data;
  };

  const handleSubmit = () => {
    const data = handleSave(); // Получаем данные из handleSave
    console.log("Отправляемые данные:", data);
    if (data) {
      // Сохраняем данные в контексте
      if (onSendData) onSendData(data);
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
    </List>
  );
};

export default Preferences;
