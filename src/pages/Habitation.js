import React, { useState, useEffect } from "react";
import { Select, List, Section, Button } from "@telegram-apps/telegram-ui";
import "../assets/styles/GeneralStyle.css";

const Habitation = ({ onSendData }) => {
  const [status, setStatus] = useState("");
  const [financialStatus, setFinancialStatus] = useState("");
  const [transferAbility, setTransferAbility] = useState("");
  const [automobile, setAutomobile] = useState("");
  const [animals, setAnimals] = useState([]);

  const statusMap = {
    "С родителями": "with_parents",
    "Собственная квартира": "own_apartment",
    "Собственный дом": "own_house",
    "Общий appartement": "shared_apartment",
    Аренда: "rent",
    Другое: "other",
  };

  const financialStatusMap = {
    "Супер стабильное": "super_stable",
    Стабильное: "stable",
    "Не стабильное": "unstable",
    Плохое: "poor",
    Пиздец: "pizd",
  };

  const animalsMap = {
    Кошка: "cat",
    Собака: "dog",
    Другое: "other",
    "Фермерские животные": "farm",
  };

  const handleSave = () => {
    const data = {
      living: {
        status: statusMap[status] || "",
        financial_status: financialStatusMap[financialStatus] || "",
        transfer_ability: transferAbility === "Да" ? "yes" : "no",
        automobile: automobile === "Да" ? "yes" : "no",
        animals: animals.map((animal) => animalsMap[animal] || ""),
      },
    };
    return data; // Возвращаем данные
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

  // const handleSubmit = () => {
  //   const data = prepareData();
  //   console.log("Отправляемые данные:", data);
  //   // onSendData(data);
  // };

  return (
    <List className="list">
      <Section header="Информация о проживании">
        <Select
          placeholder="Где живете"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled hidden>
            Где живете
          </option>
          <option>С родителями</option>
          <option>Собственная квартира</option>
          <option>Собственный дом</option>
          <option>Общий appartement</option>
          <option>Аренда</option>
          <option>Другое</option>
        </Select>

        <Select
          placeholder="Финансовое положение"
          value={financialStatus}
          onChange={(e) => setFinancialStatus(e.target.value)}
        >
          <option value="" disabled hidden>
            Финансовое положение
          </option>
          <option>Супер стабильное</option>
          <option>Стабильное</option>
          <option>Не стабильное</option>
          <option>Плохое</option>
          <option>Пиздец</option>
        </Select>

        <Select
          placeholder="Возможен ли переезд"
          value={transferAbility}
          onChange={(e) => setTransferAbility(e.target.value)}
        >
          <option value="" disabled hidden>
            Возможен ли переезд
          </option>
          <option>Да</option>
          <option>Нет</option>
        </Select>

        <Select
          placeholder="Наличие автомобиля"
          value={automobile}
          onChange={(e) => setAutomobile(e.target.value)}
        >
          <option value="" disabled hidden>
            Наличие автомобиля
          </option>
          <option>Да</option>
          <option>Нет</option>
        </Select>

        <Select
          placeholder="Наличие домашних животных"
          value={animals}
          onChange={(e) =>
            setAnimals(
              [...e.target.selectedOptions].map((option) => option.value)
            )
          }
        >
          <option value="" disabled hidden>
            Наличие домашних животных
          </option>
          <option>Кошка</option>
          <option>Собака</option>
          <option>Другое</option>
          <option>Фермерские животные</option>
        </Select>
      </Section>
    </List>
  );
};

export default Habitation;
