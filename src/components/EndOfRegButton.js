import React from "react";
<<<<<<< HEAD
import { Button, List } from "@telegram-apps/telegram-ui";

const EndOfRegButton = () => {
  return (
    <List style={{ position: "absolute", bottom: "35px", left: "16px", right: "16px"}}>
      <Button size="l" style={{ width: "97vw" }}>
        Завершение регистрации
      </Button>
    </List>
=======
import { Button } from "@telegram-apps/telegram-ui";

const EndOfRegButton = () => {
  return (
    <Button size="l" style={{ width: "48vh", margin: "16px" }}>
      Завершение регистрации
    </Button>
>>>>>>> 5b87f52ad866a78a75c53b5ea72824e4677386e0
  );
};

export default EndOfRegButton;
