import React, { useState, useEffect } from "react";
import {
  Accordion,
  Subheadline,
  List,
  Section,
  Multiselect,
  Input,
  Textarea,
  Headline,
} from "@telegram-apps/telegram-ui";
import axios from "axios";

const EducationPage = () => {
  // Функция для получения данных
  const fetchEducationplace = () => {
    axios
      .get("https://аааааааааааа-женщины.рф/api/server.getStudyPlaces")
      .then((r) => {
        console.log("r", r);
      })
      .catch((error) => {
        console.error("Error fetching education places:", error);
      });
  };

  // useEffect внутри компонента
  useEffect(() => {
    fetchEducationplace();
  }, []);

  return (
    <List>
      <Headline level="1" weight="1">
        Специализация
      </Headline>
      <Section>
        <Accordion id="ddd" onChange={function noRefCheck() {}}>
          <Accordion.Summary>Профессия</Accordion.Summary>
          <Accordion.Content>
            <Subheadline
              level="2"
              style={{
                padding: "12px 24px 24px",
              }}
            >
              This is Accordion.Content component, it is just body of Accordion.
            </Subheadline>
          </Accordion.Content>
        </Accordion>
      </Section>
      <Section>
        <Accordion id="ddd" onChange={function noRefCheck() {}}>
          <Accordion.Summary>Место обучения</Accordion.Summary>
          <Accordion.Content>
            <Subheadline
              level="2"
              style={{
                padding: "12px 24px 24px",
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
      <Section
        header="Прочая информация"
        footer="Например: Работала на трассе, 5 лет опыта, потом устроилась на первый канал"
      >
        <Textarea placeholder="Специальность, опыт работы в прошлом" />
      </Section>
    </List>
  );
};

export default EducationPage;

// const EducationPage = () => {
//   const [profession, setProfession] = useState("");
//   const [studyPlace, setStudyPlace] = useState("");
//   const [languages, setLanguages] = useState([]);
//   const [extraInfo, setExtraInfo] = useState("");

//   // Получаем данные с бэка (например, места обучения)
//   useEffect(() => {
//     axios
//       .get("https://аааааааааааа-женщины.рф/api/server.getStudyPlaces")
//       .then((response) => {
//         console.log(response.data);
//         // Если нужно, можно сохранить в стейт:
//         // setStudyPlace(response.data[0]);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleSubmit = () => {
//     const data = {
//       profession,
//       studyPlace,
//       languages,
//       extraInfo,
//     };

//     axios
//       .post("https://аааааааааааа-женщины.рф/server.saveEducationData", data)
//       .then((response) => {
//         console.log("Data saved:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error saving data:", error);
//       });
//   };
//   return (
//     <List>
//       <Headline level="1" weight="1">
//         Специализация
//       </Headline>
//       <Section>
//         <Accordion id="profession" onChange={() => {}}>
//           <Accordion.Summary>Профессия</Accordion.Summary>
//           <Accordion.Content>
//             <Input
//               placeholder="Введите профессию"
//               value={profession}
//               onChange={(e) => setProfession(e.target.value)}
//             />
//           </Accordion.Content>
//         </Accordion>
//       </Section>
//       <Section>
//         <Accordion id="studyPlace" onChange={() => {}}>
//           <Accordion.Summary>Место обучения</Accordion.Summary>
//           <Accordion.Content>
//             <Input
//               placeholder="Введите место обучения"
//               value={studyPlace}
//               onChange={(e) => setStudyPlace(e.target.value)}
//             />
//           </Accordion.Content>
//         </Accordion>
//       </Section>
//       <Section header="Языки">
//         <Multiselect
//           sectionHeader="Выберите языки"
//           value={languages} // Привязка выбранных значений к стейту
//           onChange={(selectedLanguages) => setLanguages(selectedLanguages)} // Обновление стейта
//         />
//       </Section>
//       <Section
//         header="Прочая информация"
//         footer="Например: Работала на трассе, 5 лет опыта, потом устроилась на первый канал"
//       >
//         <Textarea
//           placeholder="Специальность, опыт работы в прошлом"
//           value={extraInfo}
//           onChange={(e) => setExtraInfo(e.target.value)}
//         />
//       </Section>
//       <Section>
//         <button onClick={handleSubmit}>Сохранить</button>
//       </Section>
//     </List>
//   );
// };

// export default EducationPage;
