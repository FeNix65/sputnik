import React, { useState } from 'react';
import { Select, List, Section, Input , Multiselect, Textarea} from '@telegram-apps/telegram-ui';
import "../assets/styles/ExternalFeatures.css";


const ExternalFeatures = () => {
    return (
        <List>
            <Section header="Внешность"  footer="Данная информация не является обязательной.">
                <form className='form-section'>
                    <Input placeholder="Рост" />
                    <Input placeholder="Вес" />
                </form>
                <Select placeholder="Телосложение">
                    <option>Телосложение</option>
                    <option>Okay</option>
                </Select>
            </Section>
            <Section header="особенности внещности">
                <Multiselect sectionHeader="особенности внещности" />
            </Section>
            <Section header="вредные привычки">
                <Multiselect sectionHeader="вредные привычки" />
            </Section> 
            <Section header="Прочая информация" footer="Например: Лазерная коррекция зрения, ношу лизны">
                <Input placeholder="Перенесенные операции и прочая информация." />
            </Section>
        </List>


    )};


    export default ExternalFeatures;
