import React from "react";
import { Button, List } from "@telegram-apps/telegram-ui";

const SubRegButton = () => {
  return (
    <List
      style={{
        position: "absolute",
        bottom: "35px",
        left: "16px",
        right: "16px",
      }}
    >
      <Button size="l" style={{ width: "97vw" }}>
        Сохранить
      </Button>
    </List>
  );
};

export default SubRegButton;
