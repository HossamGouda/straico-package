import {
  ApiResponse,
  CreateRagOptions,
  Rag,
  RagPromptOptions,
  RagCompletionResponse,
} from './types';

/**
 * Creates a new RAG base.
 * @param apiKey Your Straico API key.
 * @param options The options for creating the RAG.
 * @returns The created RAG object.
 */
export async function createRag(
  apiKey: string,
  options: CreateRagOptions
): Promise<ApiResponse<Rag>> {
  const url = 'https://api.straico.com/v0/rag';
  const formData = new FormData();

  formData.append('name', options.name);
  formData.append('description', options.description);
  options.files.forEach((file) => {
    formData.append('files', file);
  });

  // Add optional parameters to the form data if they exist
  if (options.chunking_method) formData.append('chunking_method', options.chunking_method);
  if (options.chunk_size) formData.append('chunk_size', options.chunk_size.toString());
  if (options.chunk_overlap) formData.append('chunk_overlap', options.chunk_overlap.toString());
  if (options.separator) formData.append('separator', options.separator);
  if (options.separators) formData.append('separators', JSON.stringify(options.separators));
  if (options.breakpoint_threshold_type) formData.append('breakpoint_threshold_type', options.breakpoint_threshold_type);
  if (options.buffer_size) formData.append('buffer_size', options.buffer_size.toString());


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
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
 * Updates an existing RAG by adding more files.
 * @param apiKey Your Straico API key.
 * @param ragId The ID of the RAG to update.
 * @param files An array of files to add to the RAG.
 * @returns The updated RAG object.
 */
export async function updateRag(
  apiKey: string,
  ragId: string,
  files: File[]
): Promise<ApiResponse<Rag>> {
  const url = `https://api.straico.com/v0/rag/${ragId}`;
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
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
 * Deletes a specific RAG.
 * @param apiKey Your Straico API key.
 * @param ragId The ID of the RAG to delete.
 * @returns A confirmation message.
 */
export async function deleteRag(
  apiKey: string,
  ragId: string
): Promise<ApiResponse<{ message: string }>> {
  const url = `https://api.straico.com/v0/rag/${ragId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
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
 * Submits a prompt to a specific RAG and gets a completion.
 * @param apiKey Your Straico API key.
 * @param ragId The ID of the RAG to query.
 * @param options The options for the RAG prompt completion.
 * @returns The completion response from the RAG.
 */
export async function getRagPromptCompletion(
  apiKey: string,
  ragId: string,
  options: RagPromptOptions
): Promise<ApiResponse<RagCompletionResponse>> {
  const url = `https://api.straico.com/v0/rag/${ragId}/prompt`;
  const urlencoded = new URLSearchParams();
  urlencoded.append('prompt', options.prompt);
  urlencoded.append('model', options.model);

  // Add optional parameters if they exist
  if (options.search_type) urlencoded.append('search_type', options.search_type);
  if (options.k) urlencoded.append('k', options.k.toString());
  if (options.fetch_k) urlencoded.append('fetch_k', options.fetch_k.toString());
  if (options.lambda_mult) urlencoded.append('lambda_mult', options.lambda_mult.toString());
  if (options.score_threshold) urlencoded.append('score_threshold', options.score_threshold.toString());

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
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
