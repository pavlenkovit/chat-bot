import {useEffect, useState} from "react";
import {getModels} from "../../api/getModels";
import {sendMessage} from "../../api/sendMessage";
import {ModelSelector} from "../../components/ModelSelector";
import {Messages} from "../../components/Messages";
import {MessageSendingPanel} from "../../components/MessageSendingPanel";
import s from './HomePage.module.css';

export const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-prover-v2:free');

  useEffect(() => {
    async function fetchModels() {
      const models = await getModels();
      setModels(models);
    }

    fetchModels();
  }, []);

  const onSend = async (value) => {
    setMessages(prevState => [...prevState, { isMine: true, text: value }]);
    const response = await sendMessage({ content: value, model: selectedModel });
    setMessages(prevState => [...prevState, { isMine: false, text: response.choices?.[0]?.message?.content }]);
  }

  return (
    <div className={s.container}>
      <div className={s.sidebar}>
        <ModelSelector models={models} selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      </div>
      <div className={s.content}>
        <div className={s.messages}>
          <Messages messages={messages} />
        </div>
        <MessageSendingPanel onSend={onSend} />
      </div>
    </div>
  )
}