import React from "react";
import { FileInput, Headline, Section, List } from "@telegram-apps/telegram-ui";
import "../assets/styles/EndOfRegistration.css";

const EndOfRegistration = () => {
  return (
    <List
      style={{
<<<<<<< HEAD
        // background: "var(--tgui--secondary_bg_color)",
        // padding: "15px",
        // height: 400,
=======
        background: "var(--tgui--secondary_bg_color)",
        padding: "15px",
        height: 400,
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
      }}
    >
      <Headline level="1" weight="1">
        Фотография анкеты
      </Headline>
<<<<<<< HEAD
      <Section >
        <FileInput style={{ padding: "0 !important"}}
=======
      <Section>
        <FileInput
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
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
