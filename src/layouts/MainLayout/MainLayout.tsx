import s from './MainLayout.module.css';
import { ModelSelector } from '../../components/ModelSelector';
import { Chats } from '../../components/Chats';
import { Outlet } from 'react-router-dom';
import useModelsStore from '../../stores/modelsStore.ts';

export const MainLayout = () => {
  const { models, selectedModelId, setSelectedModelId } = useModelsStore();

  return (
    <div className={s.container}>
      <div className={s.sidebar}>
        <div className={s.selector}>
          <ModelSelector
            models={models}
            selectedModel={selectedModelId}
            selectModel={setSelectedModelId}
          />
        </div>
        <div className={s.chats}>
          <Chats />
        </div>
      </div>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};
