import { ApiResponse, buildHeaders } from './utils';

interface PromptCompletionOptions {
  models: string[];
  message: string;
}

interface CompletionChoice {
  message: {
    content: string;
  };
}

interface ModelCompletion {
  completion: {
    choices: CompletionChoice[];
  };
}

interface PromptCompletionResponse {
  completions: {
    [model: string]: ModelCompletion;
  };
}

export async function getPromptCompletion(
  apiKey: string,
  options: PromptCompletionOptions
): Promise<string> {
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
    const messageContent =
      responseData.data.completions[options.models[0]].completion.choices[0]
        .message.content;
    return messageContent;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
