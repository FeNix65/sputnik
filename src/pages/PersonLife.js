import React, { useState, useEffect, useCallback } from "react";
import {
  Radio,
  Cell,
  Button,
  List,
  Section,
  Headline,
  Slider,
  IconContainer,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/GeneralStyle.css";
import "../assets/styles/PersonalLife.css";

const PersonalLife = ({ onSendData }) => {
  const [hasRelationships, setHasRelationships] = useState(null);
  const [hasIntimacyRelationships, setHasIntimacyRelationships] =
    useState(null);
  const [hasMarried, setHasMarried] = useState(null);

  const [value, setValue] = useState(3); // Значение по умолчанию

  const handleSliderChange = (newValue) => {
    setValue(newValue); // Обновляем состояние значением слайдера
  };
  const handleSave = useCallback(() => {
    const data = {
      intimacy: {
        has_relationships: hasRelationships === "YES",
        has_intimacy_relationships: hasIntimacyRelationships === "YES",
        has_married: hasMarried === "YES",
        child_count: value, // Количество детей
      },
    };
    return data; // Возвращаем данные
  }, [hasRelationships, hasIntimacyRelationships, hasMarried, value]); // Зависимости для мемоизации
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
    <List
      className="list"
      // style={{ background: "var(--tgui--secondary_bg_color)", padding: "15px" }}
    >
      <Headline level="1" weight="1">
        Личная жизнь
      </Headline>

      <Section className="" header="БЫЛИ ЛИ У ВАС ОТНОШЕНИЯ">
        <form className="yesno">
          <Section>
            <Cell
              className="yesno__item"
              before={
                <Radio
                  name="hasRelationships"
                  value="NO"
                  checked={hasRelationships === "NO"}
                  onChange={() => setHasRelationships("NO")}
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
                  name="hasRelationships"
                  value="YES"
                  checked={hasRelationships === "YES"}
                  onChange={() => setHasRelationships("YES")}
                />
              }
            >
              Да
            </Cell>
          </Section>
        </form>
      </Section>

      <Section header="БЫЛИ ЛИ У ВАС ПОЛОВЫЕ ОТНОШЕНИЯ">
        <form className="yesno">
          <Section>
            <Cell
              className="yesno__item"
              before={
                <Radio
                  name="hasIntimacyRelationships"
                  value="NO"
                  checked={hasIntimacyRelationships === "NO"}
                  onChange={() => setHasIntimacyRelationships("NO")}
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
                  name="hasIntimacyRelationships"
                  value="YES"
                  checked={hasIntimacyRelationships === "YES"}
                  onChange={() => setHasIntimacyRelationships("YES")}
                />
              }
            >
              Да
            </Cell>
          </Section>
        </form>
      </Section>

      <Section header="БЫЛИ ЛИ ВЫ ЗАМУЖЕМ">
        <form className="yesno">
          <Section>
            <Cell
              className="yesno__item"
              before={
                <Radio
                  name="hasMarried"
                  value="NO"
                  checked={hasMarried === "NO"}
                  onChange={() => setHasMarried("NO")}
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
                  name="hasMarried"
                  value="YES"
                  checked={hasMarried === "YES"}
                  onChange={() => setHasMarried("YES")}
                />
              }
            >
              Да
            </Cell>
          </Section>
        </form>
      </Section>

      <Section header="Количество детей">
        <div style={{ width: "100%" }}>
          {/* <span
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "10px",
              fontSize: "18px",
            }}
          >
            {value}
          </span> */}
          <Slider
            after={<IconContainer>{value}</IconContainer>}
            onChange={handleSliderChange} // Передаем новое значение
            min={0} // Минимальное значение
            max={32} // Максимальное значение
            step={1} // Шаг
            style={{ width: "85%" }} // Слайдер занимает всю ширину
          />
        </div>
      </Section>
    </List>
  );
};

export default PersonalLife;
