import { ApiResponse, buildHeaders } from './utils';

export async function getModels(apiKey: string): Promise<string> {
  const url = 'https://api.straico.com/v1/models';
  const headers = buildHeaders(apiKey);

  try {
    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
      throw new Error(`Error fetching models: ${response.statusText}`);
    }
    const data: ApiResponse<JSON> = await response.json();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
