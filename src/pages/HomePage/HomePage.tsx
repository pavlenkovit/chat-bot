import { useEffect, useState, useCallback } from 'react';
import { getModels } from '../../api/getModels';
import { sendMessages } from '../../api/sendMessages';
import { ModelSelector } from '../../components/ModelSelector';
import { Messages } from '../../components/Messages';
import { MessageSendingPanel } from '../../components/MessageSendingPanel';

import s from './HomePage.module.css';
import { Chats } from '../../components/Chats';
import { Message } from '../../types.ts';

export const HomePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-prover-v2:free');

  useEffect(() => {
    async function fetchModels() {
      const models = await getModels();
      setModels(models);
    }

    fetchModels();
  }, []);

  const onSend = useCallback(
    async (value: string) => {
      const updatedMessages: Message[] = [...messages, { role: 'user', content: value }];
      setMessages(updatedMessages);
      const response = await sendMessages({ messages: updatedMessages, model: selectedModel });
      setMessages(prevState => [
        ...prevState,
        { role: 'system', content: response.choices?.[0]?.message?.content || '' },
      ]);
    },
    [messages, selectedModel]
  );

  return (
    <div className={s.container}>
      <div className={s.sidebar}>
        <div className={s.selector}>
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            selectModel={setSelectedModel}
          />
        </div>
        <div className={s.chats}>
          <Chats />
        </div>
      </div>
      <div className={s.content}>
        <div className={s.messages}>
          <Messages messages={messages} />
        </div>
        <div className={s.inputPanel}>
          <MessageSendingPanel onSend={onSend} />
        </div>
      </div>
    </div>
  );
};
