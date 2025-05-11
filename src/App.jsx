import { useState, useEffect} from 'react'
import Markdown from 'markdown-to-jsx'
import './App.css'

function App() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-prover-v2:free');

    useEffect(() => {
        async function fetchModels() {
            try {
                const response = await fetch('https://openrouter.ai/api/v1/models', {
                    headers: {
                        Authorization: 'Bearer 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',
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Извлекаем идентификаторы моделей
                    const modelsList = data.data.map(model => ({
                        id: model.id,
                        name: model.name || model.id
                    }));
                    setModels(modelsList);
                } else {
                    console.error('Не удалось получить список моделей');
                }
            } catch (error) {
                console.error('Ошибка при получении списка моделей:', error);
            }
        }

        fetchModels();
    }, []);

    const handleClick = async () => {
          const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              headers: {
                  Authorization: 'Bearer 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',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  model: selectedModel,
                  messages: [
                      {
                          role: 'user',
                          content: value,
                      },
                  ],
                  "max_tokens": 1000
              }),
          });

          const finalRes = await res.json();
          setResult(finalRes.choices?.[0]?.message?.content);
  }

  return (
    <>
        <div className="model-selector">
            <label htmlFor="model-select">Выберите модель: </label>
            <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
            >
                {models.length > 0 ? (
                    models.map(model => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))
                ) : (
                    <option value={selectedModel}>{selectedModel}</option>
                )}
            </select>
        </div>

        <p><input type="text" value={value} onChange={(e) => setValue(e.target.value)}/></p>
        <Markdown>{result}</Markdown>
        <p><button onClick={handleClick}>
            Send
        </button></p>
    </>
  )
}

export default App
