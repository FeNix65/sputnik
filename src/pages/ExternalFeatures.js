import React, { useState, useEffect } from "react";
import {
  Select,
  List,
  Section,
  Input,
  Multiselect,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/ExternalFeatures.css";
import { useRegistrationData } from "../States/RegistrationData";
import "../assets/styles/GeneralStyle.css";

const ExternalFeatures = ({ onSubmit }) => {
  const { registrationData, setRegistrationData } = useRegistrationData();
  const [appearanceIssues] = useState([
    { value: "piercing", label: "пирсинг" },
    { value: "tattoos", label: "татуировки" },
    { value: "other", label: "другое" },
  ]);
  const [selectedAppearanceIssues, setSelectedAppearanceIssues] = useState([]);
  const [appearanceIssuesTouched, setAppearanceIssuesTouched] = useState(false);

  const [bad_practices] = useState([
    { value: "smoking", label: "курение" },
    { value: "alcohol", label: "алкоголь" },
    { value: "drugs", label: "наркотики" },
    { value: "other", label: "другое" },
  ]);
  const [selectedBadHabits, setSelectedBadHabits] = useState([]);
  const [badHabitsTouched, setBadHabitsTouched] = useState(false);

  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [physique, setPhysique] = useState(null);
  const [otherInfo, setOtherInfo] = useState(null);

  const handleSubmit = () => {
    const data = {
      appearance: {
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        physique,
        appearanceIssues: appearanceIssuesTouched
          ? selectedAppearanceIssues.length > 0
            ? selectedAppearanceIssues.map((item) => item.value)
            : []
          : null,
        badHabits: badHabitsTouched
          ? selectedBadHabits.length > 0
            ? selectedBadHabits.map((item) => item.value)
            : []
          : null,
        other_info: otherInfo,
      },
    };
    handleSave(data);
    if (onSubmit) onSubmit(data);
  };

  const handleSave = (data) => {
    setRegistrationData({
      ...registrationData,
      appearance: {
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        physique,
        appearance_issues: appearanceIssuesTouched
          ? selectedAppearanceIssues.length > 0
            ? selectedAppearanceIssues.map((item) => item.value)
            : []
          : null,
        bad_practices: badHabitsTouched
          ? selectedBadHabits.length > 0
            ? selectedBadHabits.map((item) => item.value)
            : []
          : null,
        other_info: otherInfo,
      },
    });
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
      <Section
        header="Внешность"
        footer="Данная информация не является обязательной."
      >
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
          className="Select"
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
          onChange={(selected) => {
            setSelectedAppearanceIssues(selected);
            setAppearanceIssuesTouched(true);
          }}
          sectionHeader="Особенности внешности"
        />
      </Section>

      <Section header="Вредные привычки">
        <Multiselect
          options={bad_practices}
          value={selectedBadHabits}
          onChange={(selected) => {
            setSelectedBadHabits(selected);
            setBadHabitsTouched(true);
          }}
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
