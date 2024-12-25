import React, { useState } from 'react';
import { Select, List, Section, Input , Multiselect, Button} from '@telegram-apps/telegram-ui';
import "../assets/styles/ExternalFeatures.css";


    const ExternalFeatures = () => {
    const [appearanceIssues] = useState([
        { value: "piercing", label: "пирсинг" },
        { value: "tattoos", label: "татуировки" },
        { value: "other", label: "другое" }
      ]);
      
      const [selectedAppearanceIssues, setSelectedAppearanceIssues] = useState([]);

    const [badHabits] = useState([
        { value: "smoking", label: "курение" },
        { value: "alcohol", label: "алкоголь" },
        { value: "drugs", label: "наркотики" },
        { value: "other", label: "другое" }
        ]);
        
        const [selectedBadHabits, setSelectedBadHabits] = useState([]);

        const [height, setHeight] = useState('');
        const [weight, setWeight] = useState('');
        const [physique, setPhysique] = useState('');
        const [otherInfo, setOtherInfo] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();

        
            // Форматируем данные
            const data = {
              appearance: {
                height: parseInt(height, 10),
                weight: parseInt(weight, 10),
                appearanceIssues: selectedAppearanceIssues.map(item => item.value), // Получаем value для appearanceIssues
                badHabits: selectedBadHabits.map(item => item.value),
                physique,
                other_info: otherInfo
              }
            };
        
            // Выводим в консоль
            console.log(JSON.stringify(data, null, 2));
          };

    return (
        <List>
            <form  onSubmit={handleSubmit}>
            <Section header="Внешность"  footer="Данная информация не является обязательной.">
                <form className='form-section'>
                    <Input placeholder="Рост" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    />
                    <Input placeholder="Вес" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    />
                </form>
                <Select placeholder="Телосложение"
                value={physique}
                onChange={(e) => setPhysique(e.target.value)}
                >
                    <option value="">Телосложение</option>
                    <option value="thin">худой</option>
                    <option value="normal">нормальный</option>
                    <option value="sport">спортивный</option>
                    <option value="thick">толстый</option>
                    <option value="fat">жирный</option>
                </Select>
            </Section>
            <Section header="особенности внещности">
            <Multiselect
                options={appearanceIssues}
                value={selectedAppearanceIssues}
                onChange={(selected) => setSelectedAppearanceIssues(selected)}
                sectionHeader="Особенности внещности"
                />

            </Section>
            <Section header="вредные привычки">
            <Multiselect
                options={badHabits}
                value={selectedBadHabits}
                onChange={(selected) => setSelectedBadHabits(selected)}
                sectionHeader="Вредные привычки"
            />
            </Section> 
            <Section header="Прочая информация" footer="Например: Лазерная коррекция зрения, ношу лизны">
                <Input placeholder="Перенесенные операции и прочая информация." 
                 value={otherInfo}
                 onChange={(e) => setOtherInfo(e.target.value)}
                 />
            </Section>
            <Button type="submit">Отправить</Button>
            </form>
        </List>


    )};


    export default ExternalFeatures;
