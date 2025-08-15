import { ApiResponse } from './utils';

export async function uploadFile(
  apiKey: string,
  file: File
): Promise<ApiResponse<JSON>> {
  const url = 'https://api.straico.com/v0/file/upload';
  const formData = new FormData();
  formData.append('file', file);

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
  });
}
