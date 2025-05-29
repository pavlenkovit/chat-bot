import {API_TOKEN} from "../consts.js";

export const sendMessage = async ({ content, model }) => {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
      "max_tokens": 1000
    }),
  });

  const result = res.json();
  return result;
}