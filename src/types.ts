export type Message = {
  role: 'user' | 'system';
  error?: string;
  content: string;
};

export type Chat = {
  id: number;
  name: string;
  messages: Message[];
};

type ModelArchitecture = {
  modality: string;
  input_modalities: string[];
  output_modalities: string[];
  tokenizer: string;
  instruct_type: string;
};

type Pricing = {
  prompt: string;
  completion: string;
  request: string;
  image: string;
  web_search: string;
  internal_reasoning: string;
};

type TopProvider = {
  context_length: number;
  max_completion_tokens: number | null;
  is_moderated: boolean;
};

export type Model = {
  id: string;
  hugging_face_id: string;
  name: string;
  created: number;
  description: string;
  context_length: number;
  architecture: ModelArchitecture;
  pricing: Pricing;
  top_provider: TopProvider;
  per_request_limits: any;
  supported_parameters: string[];
};
