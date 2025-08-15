export interface ApiResponse<T> {
  data: T;
  success: boolean;
}

export interface PromptCompletionOptions {
  models: string[];
  message: string;
}

export interface ImageGenerationOptions {
  model: string;
  description: string;
  size: string;
  variations: number;
}

export interface CompletionChoice {
  message: {
    content: string;
  };
}

export interface ModelCompletion {
  completion: {
    choices: CompletionChoice[];
  };
}

export interface PromptCompletionResponse {
  completions: {
    [model: string]: ModelCompletion;
  };
}

export interface Model {
  id: string;
  name: string;
  provider: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface FileUploadResponse {
  url: string;
}

export interface ImageGenerationResponse {
  id: string;
  url: string;
}

// --- RAG Types ---

export interface Rag {
  _id: string;
  user_id: string;
  name: string;
  description: string;
  rag_url: string;
  original_filename: string;
  chunking_method: string;
  chunk_size: number;
  chunk_overlap: number;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface CreateRagOptions {
  name: string;
  description: string;
  files: File[];
  chunking_method?: 'fixed_size' | 'recursive' | 'markdown' | 'python' | 'semantic';
  chunk_size?: number;
  chunk_overlap?: number;
  separator?: string;
  separators?: string[];
  breakpoint_threshold_type?: 'percentile' | 'interquartile' | 'standard_deviation' | 'gradient';
  buffer_size?: number;
}

export interface RagPromptOptions {
  prompt: string;
  model: string;
  search_type?: 'similarity' | 'mmr' | 'similarity_score_threshold';
  k?: number;
  fetch_k?: number;
  lambda_mult?: number;
  score_threshold?: number;
}

export interface RagCompletionResponse {
  answer: string;
  references: {
    page_content: string;
    page: number;
    [key: string]: unknown;
  }[];
  file_name: string;
  coins_used: number;
}

// --- Agent Types ---

export interface Agent {
  _id: string;
  uuidv4: string;
  user_id: string;
  default_llm: string;
  custom_prompt: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  tags: string[];
  last_interaction: string | null;
  interaction_count: number;
  visibility: 'private' | 'public';
  createdAt: string;
  updatedAt: string;
  rag_association?: string;
}

export interface CreateAgentOptions {
  name: string;
  custom_prompt: string;
  default_llm: string;
  description?: string;
  tags?: string[];
}

export interface UpdateAgentOptions {
  name?: string;
  custom_prompt?: string;
  default_llm?: string;
  description?: string;
  tags?: string[];
}

export interface AgentPromptOptions {
  prompt: string;
  search_type?: 'similarity' | 'mmr' | 'similarity_score_threshold';
  k?: number;
  fetch_k?: number;
  lambda_mult?: number;
  score_threshold?: number;
}

// --- TTS & Video Types ---

export interface Voice {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface TTSOptions {
  model: 'eleven_multilingual_v2' | 'tts-1';
  text: string;
  voice_id: string;
}

export interface ImageToVideoOptions {
  model: string;
  description: string;
  size: 'square' | 'landscape' | 'portrait';
  duration: number;
  image_url: string;
}

export interface VideoGenerationResponse {
  zip: string;
  video: string[];
    price: {
    price_per_video: number;
    total: number;
  };
}

// --- Image Generation v1 Types ---

export interface ImageGenerationOptionsV1 {
  model: string;
  description: string;
  size: 'square' | 'landscape' | 'portrait';
  variations: 1 | 2 | 3 | 4;
}

export interface ImageGenerationResponseV1 {
  zip: string;
  images: string[];
  price: {
    price_per_image: number;
    quantity_images: number;
    total: number;
  };
}
