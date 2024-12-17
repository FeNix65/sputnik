import React, { useEffect, useState } from "react";
import { Modal, Placeholder } from "@telegram-apps/telegram-ui";

import PersonLife from "../pages/PersonLife";
import Habitation from "../pages/Habitation";
import Preferences from "../pages/Preferences";
import Family from "../pages/Family";

const EndOfRegistrationWithModal = ({ isModalOpen, closeModal }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const tg = window.Telegram?.WebApp;

  const pages = [
    { title: "Семья", component: <Placeholder header="Семья" description="Семейные сведения" /> },
    { title: "Личная жизнь", component: <PersonLife /> },
    { title: "Семья", component: <Family/> },
    { title: "Проживание", component: <Habitation /> },
    { title: "Предпочтения", component: <Preferences /> },
  ];

  const nextPage = () => {
    setCurrentStep((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  useEffect(() => {
    if (tg) {
      tg.MainButton.text = "Сохранить";
      tg.MainButton.show();

      const handleMainButtonClick = () => {
        if (currentStep < pages.length - 1) {
          nextPage();
        } else {
          tg.MainButton.hide();
          closeModal();
        }
      };

      tg.MainButton.onClick(handleMainButtonClick);

      return () => {
        tg.MainButton.offClick(handleMainButtonClick);
        tg.MainButton.hide();
      };
    }
  }, [currentStep, tg, closeModal]);

  return (
    <Modal
      header={<Modal.Header>{pages[currentStep].title}</Modal.Header>}
      onClose={closeModal}
      open={isModalOpen}
    >
      <div style={{ padding: "20px" }}>
        {pages[currentStep].component}
      </div>
    </Modal>
  );
};

export default EndOfRegistrationWithModal;
