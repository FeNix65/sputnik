import React, { useState } from "react";
import { Select, List, Section, Headline } from "@telegram-apps/telegram-ui";

const Habitation = () => {
  return {
    render: () => (
      <List style={{}}>
        <Section header="Проживание">
          <Select placeholder="Где живете" name="Где живете" defaultValue="">
            <option value="" disabled hidden>
              Где живете
            </option>
            <option>Частный дом</option>
            <option>Квартира</option>
            <option>Убежище</option>
          </Select>

          <Select
            placeholder="Финансовое положение"
            name="Финансовое положение"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Финансовое положение
            </option>
            <option>Финансовая свобода</option>
            <option>Финансовая стабильность</option>
            <option>Финансовая нестабильность</option>
            <option>Финансовая яма</option>
          </Select>

          <Select
            placeholder="Возможен ли переезд"
            name="Возможен ли переезд"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Возможен ли переезд
            </option>
            <option>Нет, живу не один</option>
            <option>Да, живу один</option>
          </Select>

          <Select
            placeholder="Наличие автомобиля"
            name="Наличие автомобиля"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Наличие автомобиля
            </option>
            <option>Есть</option>
            <option>Отсутствует</option>
          </Select>

          <Select
            placeholder="Наличие домашних животных"
            name="Наличие домашних животных"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Наличие домашних животных
            </option>
            <option>Есть</option>
            <option>Отсутствует</option>
          </Select>
        </Section>
      </List>
    ),
  };
};

export default Habitation;
