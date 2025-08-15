import { ApiResponse, FileUploadResponse } from './types';

export async function uploadFile(
  apiKey: string,
  file: File
): Promise<ApiResponse<FileUploadResponse>> {
  const url = 'https://api.straico.com/v0/file/upload';
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
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
