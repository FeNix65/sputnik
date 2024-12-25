import React, { useState } from "react";
import {
  FileInput,
  Headline,
  Section,
  List,
  Button,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/EndOfRegistration.css";

const EndOfRegistration = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        console.error("Файл превышает максимальный размер 10 МБ.");
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(selectedFile);

      img.onload = () => {
        if (img.width > 720 || img.height > 1280) {
          console.error("Разрешение изображения превышает 720x1280.");
        } else {
          setFile(selectedFile);
        }
        URL.revokeObjectURL(objectUrl);
      };

      img.src = objectUrl;
    }
  };

  const handleSubmit = () => {
    if (!file) {
      console.error("Файл не выбран или не соответствует требованиям.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file, file.name);

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(
      "https://аааааааааааа-женщины.рф/api/users.uploadProfilePicture",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) {
          console.log("URL загруженного файла:", result.url);
        } else {
          console.error("Ошибка при загрузке файла:", result);
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  };

  return (
    <List>
      <Headline level="1" weight="1">
        Фотография анкеты
      </Headline>
      <Section>
        <FileInput
          style={{ padding: "0 !important" }}
          label="Прикрепить фото"
          multiple={false}
          onChange={handleFileChange}
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
          </div>
        }
      />
      <Button onClick={handleSubmit}>Тест</Button>
    </List>
  );
};

export default EndOfRegistration;
