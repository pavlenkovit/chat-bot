import { create } from 'zustand';
import { Model } from '../types.ts';
import { INITIAL_MODEL_ID } from '../consts';

type ModelsState = {
  models: Model[];
  selectedModelId: Model['id'] | null;
  setModels: (models: Model[]) => void;
  setSelectedModelId: (id: Model['id']) => void;
};

const useModelsStore = create<ModelsState>(set => ({
  models: [],
  selectedModelId: INITIAL_MODEL_ID,
  setModels: models => set({ models }),
  setSelectedModelId: id => set({ selectedModelId: id }),
}));

export default useModelsStore;
