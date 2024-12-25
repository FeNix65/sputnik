import React, { useState, useEffect } from "react";
import { Select, List, Section, Input, Multiselect } from "@telegram-apps/telegram-ui";
import "../assets/styles/ExternalFeatures.css";

const ExternalFeatures = () => {
  const [appearanceIssues] = useState([
    { value: "piercing", label: "пирсинг" },
    { value: "tattoos", label: "татуировки" },
    { value: "other", label: "другое" }
  ]);

  const [selectedAppearanceIssues, setSelectedAppearanceIssues] = useState([]);
  const [badHabits] = useState([
    { value: "smoking", label: "курение" },
    { value: "alcohol", label: "алкоголь" },
    { value: "drugs", label: "наркотики" },
    { value: "other", label: "другое" }
  ]);
  const [selectedBadHabits, setSelectedBadHabits] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [physique, setPhysique] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

  const handleSubmits = () => {
    const data = {
      appearance: {
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        physique,
        appearanceIssues: selectedAppearanceIssues.map(item => item.value),
        badHabits: selectedBadHabits.map(item => item.value),
        other_info: otherInfo
      }
    };

    console.log(JSON.stringify(data, null, 2));

    const event = new CustomEvent("external-features-submit", { detail: data });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const mainButton = window.Telegram.WebApp.MainButton;

    mainButton.onClick(handleSubmits);
    mainButton.show();

    return () => {
      mainButton.offClick(handleSubmits);
    };
  }, [handleSubmits]);

  return (
    <List>
      <Section header="Внешность" footer="Данная информация не является обязательной.">
        <form className="form-section">
          <Input
            placeholder="Рост"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <Input
            placeholder="Вес"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </form>
        <Select
          placeholder="Телосложение"
          value={physique}
          onChange={(e) => setPhysique(e.target.value)}
        >
          <option value="">Телосложение</option>
          <option value="thin">худой</option>
          <option value="normal">нормальный</option>
          <option value="sport">спортивный</option>
          <option value="thick">толстый</option>
          <option value="fat">жирный</option>
        </Select>
      </Section>
      <Section header="Особенности внешности">
        <Multiselect
          options={appearanceIssues}
          value={selectedAppearanceIssues}
          onChange={(selected) => setSelectedAppearanceIssues(selected)}
          sectionHeader="Особенности внешности"
        />
      </Section>
      <Section header="Вредные привычки">
        <Multiselect
          options={badHabits}
          value={selectedBadHabits}
          onChange={(selected) => setSelectedBadHabits(selected)}
          sectionHeader="Вредные привычки"
        />
      </Section>
      <Section
        header="Прочая информация"
        footer="Например: Лазерная коррекция зрения, ношу линзы"
      >
        <Input
          placeholder="Перенесенные операции и прочая информация."
          value={otherInfo}
          onChange={(e) => setOtherInfo(e.target.value)}
        />
      </Section>
    </List>
  );
};

export default ExternalFeatures;
