import React from "react";
import { FileInput, Headline, Section, List } from "@telegram-apps/telegram-ui";
import "../assets/styles/EndOfRegistration.css";

const EndOfRegistration = () => {
  return (
    <List
      style={{
        background: "var(--tgui--secondary_bg_color)",
        padding: "15px",
        height: 400,
      }}
    >
      <Headline level="1" weight="1">
        Фотография анкеты
      </Headline>
      <Section>
        <FileInput
          label="Прикрепить фото"
          multiple
          onChange={function noRefCheck() {}}
        />
      </Section>
      <Section
        footer={
          <div className="EndOfReg__footer">
            Нажимая на кнопку ниже я принимаю{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="EndOfReg__link"
            >
              условия использования
            </a>{" "}
            и{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="EndOfReg__link"
            >
              политику конфиденциальности
            </a>
            .
          </div>
        }
      />
    </List>
  );
};

export default EndOfRegistration;
