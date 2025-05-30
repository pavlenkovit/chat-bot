import { ChatPage } from './pages/ChatPage';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { NewChatPage } from './pages/NewChatPage';
import { useEffect } from 'react';
import { getModels } from './api/getModels.ts';
import useModelsStore from './stores/modelsStore.ts';

function App() {
  const { setModels } = useModelsStore();

  useEffect(() => {
    async function fetchModels() {
      const models = await getModels();
      setModels(models);
    }

    fetchModels();
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/" element={<NewChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;
