import { Select } from '../Select';

export const ModelSelector = ({ models, selectModel, selectedModel }) => {
  return (
    <div>
      <Select
        options={models.map(model => ({ value: model.id, label: model.name }))}
        value={selectedModel}
        onChange={selectModel}
      />
    </div>
  );
};
