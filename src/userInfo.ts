import { ApiResponse, UserInfo } from './types';
import { buildHeaders } from './utils';

export async function getUserInfo(apiKey: string): Promise<ApiResponse<UserInfo>> {
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

    const data: ApiResponse<UserInfo> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
