import React, { useState } from "react";
import {
  Select,
  List,
  Section,
  Headline,
  Input,
  Multiselect,
  Textarea,
} from "@telegram-apps/telegram-ui";

const ExternalFeatures = () => {
  return {
    render: () => (
      <List style={{}}>
        <Headline level="1" weight="1">
          Внешность
        </Headline>
        <form className="HeightandWeight">
          <Input placeholder="Рост" />
          <Input placeholder="Вес" />
        </form>
        <Section footer="Данная информация не является обязательной">
          <Select placeholder="Телосложение">
            <option>Телосложение</option>
            <option>Okay</option>
          </Select>
        </Section>

        <Section header="Особенности внешности">
          <Multiselect sectionHeader="Pick from existed options" />
        </Section>

        <Section header="Вредные привычки">
          <Multiselect sectionHeader="Pick from existed options" />
        </Section>

        <Section
          header="Прочая информация"
          footer="Например: Лазерная коррекция зрения,ношу линзы."
        >
          <Textarea placeholder="Перенесенные операции и прочая информация." />
        </Section>
      </List>
    ),
  };
};

export default ExternalFeatures;
