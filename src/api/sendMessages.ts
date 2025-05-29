import { API_TOKEN } from '../consts';
import { Message } from '../types';

type SendMessageParams = {
  messages: Message[];
  model: string;
};
export const sendMessages = async ({ messages, model }: SendMessageParams) => {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: messages,
      max_tokens: 1000,
    }),
  });

  const result = res.json();
  return result;
};
