import { Model } from '../types.ts';

export const getModels = async () => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization:
          'Bearer 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',
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
