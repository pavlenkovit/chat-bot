import { Chat } from './types.ts';

export const API_TOKEN =
  'Bearer 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';
export const INITIAL_MODEL_ID = 'google/gemma-2-9b-it:free';
export const MOCK_CHATS: Chat[] = [
  {
    id: 1,
    name: 'Общие вопросы',
    messages: [
      { role: 'user', content: 'Какая столица Франции?' },
      { role: 'system', content: 'Столица Франции — Париж.' },
      { role: 'user', content: 'Можешь порекомендовать интересную книгу по истории?' },
      {
        role: 'system',
        content:
          'Конечно! "Сапиенс: Краткая история человечества" Юваля Ноя Харари — отличный выбор.',
      },
    ],
  },
  {
    id: 2,
    name: 'Помощь с программированием',
    messages: [
      { role: 'user', content: 'Как перевернуть строку в JavaScript?' },
      {
        role: 'system',
        content:
          'Вы можете использовать методы `split`, `reverse` и `join`. Например:\n\n`"пример".split("").reverse().join("")`',
      },
      { role: 'user', content: 'Спасибо! Можно ли сделать то же самое через цикл?' },
      {
        role: 'system',
        content:
          'Конечно! Вот пример, как перевернуть строку с использованием цикла:\n\n```javascript\nfunction reverseString(str) {\n  let reversed = "";\n  for (let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}\nconsole.log(reverseString("пример"));\n```',
      },
    ],
  },
  {
    id: 3,
    name: 'Советы по путешествиям',
    messages: [
      { role: 'user', content: 'Какие места обязательно посетить в Японии?' },
      { role: 'system', content: 'Обязательно посетите Токио, Киото, Осаку, гору Фудзи и Нару.' },
      { role: 'user', content: 'Какое время года лучше всего подходит для поездки в Киото?' },
      {
        role: 'system',
        content:
          'Лучшее время для поездки в Киото — сезон цветения сакуры весной (с марта по апрель) или сезон осенней листвы (ноябрь).',
      },
      { role: 'user', content: 'Спасибо за советы!' },
      { role: 'system', content: 'Не за что! Желаю вам отличного путешествия.' },
    ],
  },
];
