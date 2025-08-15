import { ApiResponse } from './utils';

interface ImageGenerationOptions {
  model: string;
  description: string;
  size: string;
  variations: number;
}

export async function generateImage(
  apiKey: string,
  options: ImageGenerationOptions
): Promise<ApiResponse<JSON>> {
  const url = 'https://api.straico.com/v0/image/generation';
  const data = {
    model: options.model,
    description: options.description,
    size: options.size,
    variations: options.variations,
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
  });
}
