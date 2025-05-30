import { Model } from '../types';
import { API_TOKEN } from '../consts';

export const getModels = async () => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: API_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();

      const freeModels = result.data.filter((model: Model) => {
        const pricing = model.pricing;
        return (
          pricing.prompt === '0' &&
          pricing.completion === '0' &&
          pricing.request === '0' &&
          pricing.image === '0' &&
          pricing.web_search === '0' &&
          pricing.internal_reasoning === '0'
        );
      });

      return freeModels;
    } else {
      console.error('Не удалось получить список моделей');
    }
  } catch (error) {
    console.error('Ошибка при получении списка моделей:', error);
  }
};
