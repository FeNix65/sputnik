import React from "react";
import { Button } from "@telegram-apps/telegram-ui";
import "../assets/styles/CustomButton.css"; // Импорт файла стилей

const CustomButton = () => {
  return (
    <Button size="l" style={{ width: "48vh", margin: "16px" }}>
      Продолжить
    </Button>
  );
};

export default CustomButton;
