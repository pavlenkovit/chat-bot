import s from './MainLayout.module.css';
import { ModelSelector } from '../../components/ModelSelector';
import { Chats } from '../../components/Chats';
import { Outlet } from 'react-router-dom';
import useModelsStore from '../../stores/modelsStore.ts';
import { Typography } from '../../components/Typography';

export const MainLayout = () => {
  const { models, selectedModelId, setSelectedModelId } = useModelsStore();

  return (
    <div className={s.root}>
      <div className={s.header}>
          <div className={s.headerTitle}>
            <Typography variant="h1">GPT-Training</Typography>
          </div>
    
          <ModelSelector
            models={models}
            selectedModel={selectedModelId}
            selectModel={setSelectedModelId}
          />

      </div>
    <div className={s.container}>
      <div className={s.sidebar}>
        <div className={s.chats}>
          <Chats />
        </div>
      </div>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
    </div>
  );
};
