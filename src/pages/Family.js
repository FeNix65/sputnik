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
  } from "@telegram-apps/telegram-ui";
  
  const Family = () => {
    return (
      <List>
        <Section header="Семья">
          <Select
            placeholder="Ваша родительская семья"
            name="Ваша родительская семья"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Ваша родительская семья
            </option>
            <option>Традиционная семья</option>
            <option>Одиночная родительская семья</option>
            <option>Семья-патриархат</option>
            <option>Детско-родительские отношения</option>
            <option>Семья-компаньонов</option>
            <option>Манипулятивные отношения</option>
            <option>Сопернические отношения</option>
          </Select>
  
          <Select
            placeholder="Кто распоряжается бюджетом"
            name="Кто распоряжается бюджетом"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Кто распоряжается бюджетом
            </option>
            <option>Совместный</option>
            <option>Смешанный</option>
            <option>Единоличный</option>
          </Select>
  
          <Select
            placeholder="Наличие братьев и сестер"
            name="Наличие братьев и сестер"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Наличие братьев и сестер
            </option>
            <option>Есть</option>
            <option>Отсутствуют</option>
          </Select>
        </Section>
  
        <Section
          header="Прочая информация"
          footer="Например: Брату 19 лет, менеджер Инстасвалки"
        >
          <Input placeholder="Прочая информация о вашей семье" />
        </Section>
      </List>
    );
  };
  
  export default Family;