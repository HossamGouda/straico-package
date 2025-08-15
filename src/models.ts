import { ApiResponse, Model } from './types';
import { buildHeaders } from './utils';

export async function getModels(apiKey: string): Promise<ApiResponse<Model[]>> {
  const url = 'https://api.straico.com/v1/models';
  const headers = buildHeaders(apiKey);

  try {
    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
      throw new Error(`Error fetching models: ${response.statusText}`);
    }
    const data: ApiResponse<Model[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
