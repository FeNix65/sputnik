import React, { useState } from 'react';
import { Select, Textarea, List, Section} from '@telegram-apps/telegram-ui';


const Preferences = () => {
    return (
        <List>
            <Section header="Предпочтения">
                <Select placeholder="Предпочтения">
                    <option>Религия</option>
                    <option>Okay</option>
                </Select>
            </Section>
            <Section>
                <Select placeholder="Телосложение">
                    <option>Предпочтительный семейный строй</option>
                    <option>Okay</option>
                </Select>
            </Section>
            <Section header="Прочая информация" footer="Например: Блогер-самоучка, люблю лошедей">
                <Textarea placeholder="Ваши увлечения и хобби" />
            </Section>
        </List>


    )};

    export default Preferences;