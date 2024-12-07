import React, { useState } from 'react';
import { Select, List, Section } from '@telegram-apps/telegram-ui';

const Habitation = () => {
    return (
    {
    render: () => <List style={{
    
    }}>
        <Section header="Проживание">
          <Select placeholder="Где живете">
            <option>Hello</option>
            <option>Okay</option>
          </Select>
        </Section>

        <Section >
          <Select placeholder="Финансовое положение">
            <option>Hello</option>
            <option>Okay</option>
          </Select>
        </Section>

        <Section >
          <Select placeholder="Возможен ли переезд">
            <option>Hello</option>
            <option>Okay</option>
          </Select>
        </Section>

        <Section >
          <Select placeholder="Наличие автомобиля">
            <option>Hello</option>
            <option>Okay</option>
          </Select>
        </Section>

        <Section >
          <Select placeholder="Наличие домашних животных">
            <option>Hello</option>
            <option>Okay</option>
          </Select>
        </Section>
      </List>
    } 


    )};

    export default Habitation;