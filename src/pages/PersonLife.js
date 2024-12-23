import React, { useState } from "react";

import {
  Radio,
  Cell,
  Caption,
  Select,
  Headline,
  Textarea,
  Accordion,
  Subheadline,
  List,
  Section,
  Multiselect,
  Input,
  Slider,

} from "@telegram-apps/telegram-ui";
import "../assets/styles/PersonalLife.css";



const PersonalLife = () => {
  const SteppedRangeSlider = () => {
    // const [value, setValue] = useState(3);
  
    // const handleSliderChange = (event, newValue) => {
    //   setValue(newValue);
    // };
  
    // return (
    //   <div style={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
    //     <Typography variant="h6">Количество детей</Typography>
    //     <Slider
    //       value={value}
    //       onChange={handleSliderChange}
    //       step={1} // Шаг слайдера
    //       min={1} // Минимальное значение
    //       max={32} // Максимальное значение
    //       valueLabelDisplay="on" // Показ значения рядом с ползунком
    //     />
    //   </div>
    // );
  };
  return (
    <List
      style={{
        background: "var(--tgui--secondary_bg_color)",
        padding: "15px",
        height: 600,
      }}
    >
      <Headline level="1" weight="1">
        Личная жизнь
      </Headline>
      
      <Section header="БЫЛИ ЛИ У ВАС ОТНОШЕНИЯ"></Section>
      <form className="relationships">
        <Section>
          <Cell
            className="relationships__item"
            before={<Radio name="radio" value="NO" />}
          >
            Нет
          </Cell>
        </Section>
        <Section>
          <Cell
            className="relationships__item"
            before={<Radio name="radio" value="YES" />}
          >
            Да
          </Cell>
        </Section>
        </form>
        <Section header="БЫЛИ ЛИ У ВАС ПОЛОВЫЕ ОТНОШЕНИЯ"></Section>
      <form className="relationships">
        <Section>
          <Cell
            className="relationships__item"
            before={<Radio name="radio" value="NO" />}
          >
            Нет
          </Cell>
        </Section>
        <Section>
          <Cell
            className="relationships__item"
            before={<Radio name="radio" value="YES" />}
          >
            Да
          </Cell>
        </Section>
        </form>
        <Section header="БЫЛИ ЛИ ВЫ ЗАМУЖЕМ"></Section>
      <form className="relationships">
        <Section>
          <Cell
            className="relationships__item"
            before={<Radio name="radio" value="NO" />}
          >
            Нет
          </Cell>
        </Section>
        <Section>
          <Cell
            className="relationships__item"
            before={<Radio name="radio" value="YES" />}
          >
            Да
          </Cell>
        </Section>
      </form>
      <Section header="Колличество детей">
        <Slider step={32} multiple />
      </Section>
    </List>
  );
};

export default PersonalLife;
