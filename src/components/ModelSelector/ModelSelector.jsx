export const ModelSelector = ({ models, selectModel, selectedModel }) => {
  return <div>
    <label htmlFor="model-select">Выберите модель: </label>
    <select
      id="model-select"
      value={selectedModel}
      onChange={(e) => selectModel(e.target.value)}
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
  </div>;
}