import React, { useState } from 'react';
import { Accordion, Subheadline, List, Section, Multiselect, Input} from '@telegram-apps/telegram-ui';

const EducationPage = () => {
    return (
        <List>
    <Section header="Специализация">
        <Accordion
        
        id="ddd"
        onChange={function noRefCheck(){}}
      >
        <Accordion.Summary>
        Профессия
        </Accordion.Summary>
        <Accordion.Content>
        <Subheadline
                level="2"
                style={{
                padding: '12px 24px 24px'
                }}
            >
                This is Accordion.Content component, it is just body of Accordion.
        </Subheadline>
        </Accordion.Content>
      </Accordion>
     
        <Accordion
            id="ddd"
            onChange={function noRefCheck(){}}
        >
            <Accordion.Summary>
            Место обучения
            </Accordion.Summary>
            <Accordion.Content>
            <Subheadline
                    level="2"
                    style={{
                    padding: '12px 24px 24px'
                    }}
                >
                    This is Accordion.Content component, it is just body of Accordion.
            </Subheadline>
            </Accordion.Content>
        </Accordion>
      </Section>
      <Section header="языки">
        <Multiselect sectionHeader="Pick from existed options" />
      </Section>
      <Section header="Прочая информация" footer="Например: Работала на трассе, 5 лет опыта, потом устроилась на первый канал">
        <Input placeholder="Специальность, опыт работы в прошлом" />
      </Section>
      </List>
      
    )
}

export default EducationPage;