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
const Family = ({ onSendData }) => {
  const [status, setStatus] = useState(null);
  const [budgetManagement, setBudgetManagement] = useState(null);
  const [siblings, setSiblings] = useState(null);
  const [otherInfo, setOtherInfo] = useState("");

  // Маппинг для статуса семьи, кто распоряжается бюджетом и наличие братьев/сестер
  const statusMap = {
    "Полная семья": "full",
    Разведены: "parted",
    "Неполная семья": "dead_parted",
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

  const handleSave = useCallback(() => {
    const data = {
      family: {
        status: statusMap[status] || "",
        budget_management: budgetManagementMap[budgetManagement] || "",
        siblings: siblingsMap[siblings] || "",
        other_info: otherInfo,
      },
    };
    return data;
  }, [status, budgetManagement, siblings, otherInfo]); // зависимости для мемоизации

  // Пример функции handleSubmit
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
      <Section header="Информация о семье">
        <Select
          className="Select"
          placeholder="Статус семьи"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled hidden>
            Статус семьи
          </option>
          <option>Полная семья</option>
          <option>Разведены</option>
          <option>Неполная семья</option>
          <option>Неизвестно</option>
        </Select>
        <Divider />
        <Select
          className="Select"
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
          className="Select"
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
    </List>
  );
};

export default Family;
