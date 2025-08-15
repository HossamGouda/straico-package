import {
  ApiResponse,
  ImageToVideoOptions,
  VideoGenerationResponse,
} from './types';
import { buildHeaders } from './utils';

/**
 * Generates a video from an image.
 * @param apiKey Your Straico API key.
 * @param options The options for the image-to-video generation.
 * @returns The generated video data.
 */
export async function generateImageToVideo(
  apiKey: string,
  options: ImageToVideoOptions
): Promise<ApiResponse<VideoGenerationResponse>> {
  const url = 'https://api.straico.com/v1/image/tovideo';
  const headers = buildHeaders(apiKey);
  const body = JSON.stringify(options);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}