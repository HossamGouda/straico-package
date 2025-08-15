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
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface ImageGenerationResponse {
  id: string;
  url: string;
}
