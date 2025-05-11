import { useState} from 'react'
import Markdown from 'markdown-to-jsx'
import './App.css'

function App() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const handleClick = async () => {
          const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              headers: {
                  Authorization: 'Bearer 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',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  model: 'deepseek/deepseek-prover-v2:free',
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
        <p><input type="text" value={value} onChange={(e) => setValue(e.target.value)}/></p>
        <Markdown>{result}</Markdown>
        <p><button onClick={handleClick}>
            Send
        </button></p>
    </>
  )
}

export default App
