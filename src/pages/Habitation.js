import React, { useState, useEffect, useCallback } from "react";
import {
  Select,
  List,
  Section,
  Button,
  Cell,
  Radio,
  Multiselect,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/GeneralStyle.css";

const Habitation = ({ onSendData }) => {
  const [status, setStatus] = useState(null);
  const [financialStatus, setFinancialStatus] = useState(null);
  const [transferAbility, setTransferAbility] = useState(null);
  const [hasAutomobile, setHasAutomobile] = useState(null);
  // const [animals, setAnimals] = useState(null);

  const [animals] = useState([
    { value: "cat", label: "Кошка" },
    { value: "dog", label: "Собака" },
    { value: "other", label: "Другое" },
    { value: "farm", label: "Фермерские животные" },
  ]);

  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [animalsTouched, setAnimalsTouched] = useState(false);

  const statusMap = {
    "С родителями": "with_parents",
    "Собственная квартира": "own_apartment",
    "Собственный дом": "own_house",
    Общежитие: "shared_apartment",
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

  const handleSave = useCallback(() => {
    const data = {
      living: {
        status: statusMap[status] || null,
        financial_status: financialStatusMap[financialStatus] || null,
        transfer_ability: transferAbility === "YES",
        automobile: hasAutomobile === "YES",
        animals: animalsTouched
          ? selectedAnimals.length > 0
            ? selectedAnimals.map((item) => animalsMap[item.value])
            : []
          : null,
      },
    };
    return data; // Возвращаем данные
  }, [status, financialStatus, transferAbility, hasAutomobile, animals]);

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

  // const handleSubmit = () => {
  //   const data = prepareData();
  //   console.log("Отправляемые данные:", data);
  //   // onSendData(data);
  // };

  return (
    <List className="list">
      <Section header="Информация о проживании">
        <Select
          className="Select"
          // style={{
          //   background: "var(--tgui--section_bg_color)",
          // }}
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
          <option>Общежитие</option>
          <option>Аренда</option>
          <option>Другое</option>
        </Select>

        <Select
          className="Select"
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
          <form className="yesno">
            <Section>
              <Cell
                className="yesno__item"
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
                className="yesno__item"
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
          <form className="yesno">
            <Section>
              <Cell
                className="yesno__item"
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
                className="yesno__item"
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

        <Section header="Наличие домашних животных">
          <Multiselect
            options={animals}
            value={selectedAnimals}
            onChange={(selected) => {
              setSelectedAnimals(selected);
              setAnimalsTouched(true);
            }}
            sectionHeader="Вредные привычки"
          />
        </Section>

        {/* <Select
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
        </Select> */}
      </Section>
    </List>
  );
};

export default Habitation;
