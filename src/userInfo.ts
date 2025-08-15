import { ApiResponse, buildHeaders } from './utils';

export async function getUserInfo(apiKey: string): Promise<string> {
  const url = 'https://api.straico.com/v0/user';
  const headers = buildHeaders(apiKey);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data: ApiResponse<JSON> = await response.json();
    return JSON.stringify(data.data, null, 2);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
