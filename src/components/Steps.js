import React, { useState } from 'react';
import { Steps } from '@telegram-apps/telegram-ui';

const StepsPanel = () => {
    return (
    <Steps
        count={4}
        progress={2}
    />
    )
}

export default StepsPanel;