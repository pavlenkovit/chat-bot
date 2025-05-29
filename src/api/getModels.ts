export const getModels = async () => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: 'Bearer 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',
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();

      const modelsList = data.data.map(model => ({
        id: model.id,
        name: model.name || model.id
      }));

      return modelsList;
    } else {
      console.error('Не удалось получить список моделей');
    }
  } catch (error) {
    console.error('Ошибка при получении списка моделей:', error);
  }
}