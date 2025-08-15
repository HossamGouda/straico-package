import {
  ApiResponse,
  ImageGenerationOptions,
  ImageGenerationResponse,
  ImageGenerationOptionsV1,
  ImageGenerationResponseV1,
} from './types';

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

/**
 * Generates an image using the v1.0 endpoint.
 * @param apiKey Your Straico API key.
 * @param options The options for the image generation.
 * @returns The generated image data.
 */
export async function generateImageV1(
  apiKey: string,
  options: ImageGenerationOptionsV1
): Promise<ApiResponse<ImageGenerationResponseV1>> {
  const url = 'https://api.straico.com/v1/image/generation';
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
