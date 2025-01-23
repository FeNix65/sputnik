import React, { useState, useEffect, useCallback } from "react";
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
  const [religion, setReligion] = useState(null);
  const [familyStructure, setFamilyStructure] = useState(null);
  const [otherInfo, setOtherInfo] = useState(null);

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

  const handleSave = useCallback(() => {
    const data = {
      prefers: {
        religion: religionMap[religion] || "",
        family_build_status: familyMap[familyStructure] || "",
        other_info: otherInfo,
      },
    };
    return data;
  }, [religion, familyStructure, otherInfo]);

  const handleSubmit = useCallback(() => {
    const mainButton = window.Telegram.WebApp.MainButton;
    mainButton.disable(); // Отключаем кнопку, чтобы предотвратить повторные клики

    try {
      const data = handleSave();
      console.log("Отправляемые данные:", data);

      if (data && onSendData) {
        onSendData(data); // Сохраняем данные в контексте
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      mainButton.enable(); // Включаем кнопку в любом случае
    }
  }, [handleSave, onSendData]); // зависимости для мемоизации

  useEffect(() => {
    const mainButton = window.Telegram.WebApp.MainButton;

    mainButton.onClick(handleSubmit);
    mainButton.show(); // Показываем кнопку

    return () => {
      mainButton.offClick(handleSubmit); // Убираем обработчик при размонтировании
      mainButton.hide(); // Прячем кнопку
    };
  }, [handleSubmit]);

  return (
    <List className="list">
      <Section header="Предпочтения">
        <Select
          className="Select"
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
          className="Select"
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
          value={otherInfo}
          onChange={(e) => setOtherInfo(e.target.value)}
        />
      </Section>
    </List>
  );
};

export default Preferences;
