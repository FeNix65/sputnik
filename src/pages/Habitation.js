import React, { useState, useEffect } from "react";
import {
  Select,
  List,
  Section,
  Button,
  Cell,
  Radio,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/GeneralStyle.css";

const Habitation = ({ onSendData }) => {
  const [status, setStatus] = useState(null);
  const [financialStatus, setFinancialStatus] = useState(null);
  const [transferAbility, setTransferAbility] = useState(null);
  const [hasAutomobile, setHasAutomobile] = useState(null);
  const [animals, setAnimals] = useState(null);

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
        status: statusMap[status] || null,
        financial_status: financialStatusMap[financialStatus] || "",
        transfer_ability: transferAbility === "YES",
        automobile: hasAutomobile === "YES",
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

        <Section header="Есть ли у вас автомобиль">
          <form className="TransferAbility">
            <Section>
              <Cell
                className="setTransferAbility__item"
                before={
                  <Radio
                    name="transferAbility"
                    value="NO"
                    checked={transferAbility === "NO"}
                    onChange={() => setTransferAbility("NO")}
                  />
                }
              >
                Нет
              </Cell>
            </Section>
            <Section>
              <Cell
                className="TransferAbility__item"
                before={
                  <Radio
                    name="transferAbility"
                    value="NO"
                    checked={transferAbility === "YES"}
                    onChange={() => setTransferAbility("YES")}
                  />
                }
              >
                Да
              </Cell>
            </Section>
          </form>
        </Section>

        {/* <Select
          placeholder="Возможен ли переезд"
          value={transferAbility}
          onChange={(e) => setTransferAbility(e.target.value)}
        >
          <option value="" disabled hidden>
            Возможен ли переезд
          </option>
          <option>Да</option>
          <option>Нет</option>
        </Select> */}

        <Section header="Есть ли у вас автомобиль">
          <form className="automobile">
            <Section>
              <Cell
                className="automobile__item"
                before={
                  <Radio
                    name="hasautomobile"
                    value="NO"
                    checked={hasAutomobile === "NO"}
                    onChange={() => setHasAutomobile("NO")}
                  />
                }
              >
                Нет
              </Cell>
            </Section>
            <Section>
              <Cell
                className="automobile__item"
                before={
                  <Radio
                    name="hasautomobile"
                    value="NO"
                    checked={hasAutomobile === "YES"}
                    onChange={() => setHasAutomobile("YES")}
                  />
                }
              >
                Да
              </Cell>
            </Section>
          </form>
        </Section>

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
