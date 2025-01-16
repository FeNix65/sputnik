import React, { useState, useEffect } from "react";
import {
  FileInput,
  Headline,
  Section,
  List,
  Button,
} from "@telegram-apps/telegram-ui";
import "../assets/styles/EndOfRegistration.css";
import { useRegistrationData } from "../States/RegistrationData.js";
import { useTokens } from "../States/TokenContext"; // Импортируем useTokens
import config from "../config.js";

const EndOfRegistration = ({ onSubmit }) => {
  const [error, setError] = useState(null);
  // const { tokens } = useTokens();
  const [file, setFile] = useState(null);
  const { registrationData, setRegistrationData } = useRegistrationData();

  // useEffect(() => {
  //   // Вставить логику, которая использует токены, если они есть
  //   if (tokens) {
  //     console.log("Токены на странице :", tokens);
  //   } else {
  //     console.log("Токенов на странице  нет");
  //   }
  // }, [tokens]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        console.error("Файл превышает максимальный размер 10 МБ.");
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);

      img.onload = () => {
        if (img.width != 720 || img.height != 1280) {
          console.error("Разрешение изображения превышает 720x1280.");
        } else {
          setFile(selectedFile);
          console.log("Выбранный файл:", selectedFile);
        }
      };
    }
  };

  const handleSave = () => {
    if (!file) {
      console.error("Файл не выбран или не соответствует требованиям.");
      return;
    }
    setRegistrationData({
      ...registrationData,
      profilePicture: file,
    });

    // Добавляем файл в данные регистрации
    // setRegistrationData((prevData) => ({
    //   ...prevData,

    // }));

    // setRegistrationData({
    //   ...registrationData,
    //   profilePicture: file,
    //   //
    // });
    // console.log("Данные регистрации после сохранения файла:", {
    //   ...registrationData,
    //   profilePicture: file,
    // });
  };
  // console.log("фотка:", prevData);

  const UploadProfilePicture = async () => {
    if (!file) {
      console.error("Файл не выбран.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      let access_token = localStorage.getItem("access_token");
      const response = await fetch(
        `${config.serverUrl}api/users.uploadProfilePicture`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) throw new Error("Сервер недоступен");
      const result = await response.json();
      console.log("Результат загрузки:", result);
      return result;
    } catch (error) {
      setError("Ошибка: Сервер недоступен");
      throw error;
    }
  };

  const handleSubmit = async () => {
    const data = {};
    const uploadPhotoPromise = UploadProfilePicture();
    const sendProfileDataPromise = handleSave();
    await Promise.all([uploadPhotoPromise, sendProfileDataPromise]);

    if (onSubmit) onSubmit(data);
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
        <img src={file} alt="Profile" width={96} height={96} />
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
    </List>
  );
};

export default EndOfRegistration;
