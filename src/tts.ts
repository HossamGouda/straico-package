import { ApiResponse, Voice, TTSOptions } from './types';
import { buildHeaders } from './utils';

/**
 * Retrieves the list of available Eleven Labs voices.
 * @param apiKey Your Straico API key.
 * @returns A list of available voices.
 */
export async function getElevenLabsVoices(
  apiKey: string
): Promise<ApiResponse<Voice[]>> {
  const url = 'https://api.straico.com/v1/tts/elevenlabslist';
  const headers = buildHeaders(apiKey);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
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

/**
 * Creates a text-to-speech conversion.
 * @param apiKey Your Straico API key.
 * @param options The options for the TTS conversion.
 * @returns The audio data for the generated speech.
 */
export async function createTextToSpeech(
  apiKey: string,
  options: TTSOptions
): Promise<Blob> {
  const url = 'https://api.straico.com/v1/tts/create';
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const urlencoded = new URLSearchParams();
  urlencoded.append('model', options.model);
  urlencoded.append('text', options.text);
  urlencoded.append('voice_id', options.voice_id);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: urlencoded,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    // The response is audio data, not JSON
    return response.blob();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
