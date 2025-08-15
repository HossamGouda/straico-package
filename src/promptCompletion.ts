import {
  ApiResponse,
  PromptCompletionOptions,
  PromptCompletionResponse,
} from './types';
import { buildHeaders } from './utils';

export async function getPromptCompletion(
  apiKey: string,
  options: PromptCompletionOptions
): Promise<ApiResponse<PromptCompletionResponse>> {
  const url = 'https://api.straico.com/v1/prompt/completion';
  const headers = buildHeaders(apiKey);
  const data = {
    models: options.models,
    message: options.message,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const responseData: ApiResponse<PromptCompletionResponse> =
      await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
