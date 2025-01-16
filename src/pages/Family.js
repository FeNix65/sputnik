import React, { useState } from "react";
import {
  Select,
  Input,
  Divider,
  Button,
  Section,
  List,
} from "@telegram-apps/telegram-ui";

const Family = ({ onSendData }) => {
  const [status, setStatus] = useState("");
  const [budgetManagement, setBudgetManagement] = useState("");
  const [siblings, setSiblings] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

  // Маппинг для статуса семьи, кто распоряжается бюджетом и наличие братьев/сестер
  const statusMap = {
    "Полная семья": "full",
    Разведены: "parted",
    "Разведены и умерли": "dead_parted",
    Неизвестно: "unknown",
  };

  const budgetManagementMap = {
    Отец: "father",
    Мать: "mother",
    Оба: "both",
  };

  const siblingsMap = {
    Есть: "yes",
    Нет: "no",
    Сводные: "step",
  };

  const prepareData = () => {
    return {
      status: statusMap[status] || "",
      budget_management: budgetManagementMap[budgetManagement] || "",
      siblings: siblingsMap[siblings] || "",
      other_info: otherInfo,
    };
  };

  const handleSubmit = () => {
    const data = prepareData();
    console.log("Отправляемые данные:", data);
    // onSendData(data);
  };

  return (
    <List className="List">
      <Section header="Информация о семье">
        <Select
          placeholder="Статус семьи"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled hidden>
            Статус семьи
          </option>
          <option>Полная семья</option>
          <option>Разведены</option>
          <option>Разведены и умерли</option>
          <option>Неизвестно</option>
        </Select>
        <Divider />
        <Select
          placeholder="Кто распоряжается бюджетом"
          value={budgetManagement}
          onChange={(e) => setBudgetManagement(e.target.value)}
        >
          <option value="" disabled hidden>
            Кто распоряжается бюджетом
          </option>
          <option>Отец</option>
          <option>Мать</option>
          <option>Оба</option>
        </Select>
        <Divider />
        <Select
          placeholder="Наличие братьев и сестер"
          value={siblings}
          onChange={(e) => setSiblings(e.target.value)}
        >
          <option value="" disabled hidden>
            Наличие братьев и сестер
          </option>
          <option>Есть</option>
          <option>Нет</option>
          <option>Сводные</option>
        </Select>
      </Section>
      <Divider />
      <Section header="Прочая информация" footer="Максимум 256 символов">
        <Input
          placeholder="Прочая информация о семье"
          value={otherInfo}
          onChange={(e) => setOtherInfo(e.target.value)}
        />
      </Section>
      <Button onClick={handleSubmit}>Тестируем</Button>
    </List>
  );
};

export default Family;
