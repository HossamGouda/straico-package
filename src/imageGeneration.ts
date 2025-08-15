import { ApiResponse, ImageGenerationOptions, ImageGenerationResponse } from './types';

export async function generateImage(
  apiKey: string,
  options: ImageGenerationOptions
): Promise<ApiResponse<ImageGenerationResponse>> {
  const url = 'https://api.straico.com/v0/image/generation';
  const data = {
    model: options.model,
    description: options.description,
    size: options.size,
    variations: options.variations,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
