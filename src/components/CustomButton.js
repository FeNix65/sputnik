import React from 'react';
import { Button } from '@telegram-apps/telegram-ui';
import '../assets/styles/CustomButton.css'; // Импорт файла стилей

const CustomButton = () => {
    return (
        <Button size="l" style={{width: '45vh',
            margin: '15px'}}>
            Продолжить
        </Button>
    );
};

export default CustomButton;