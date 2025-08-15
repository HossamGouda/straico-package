import {
  ApiResponse,
  Agent,
  CreateAgentOptions,
  UpdateAgentOptions,
  AgentPromptOptions,
  RagCompletionResponse,
} from './types';
import { buildHeaders } from './utils';

/**
 * Creates a new agent.
 * @param apiKey Your Straico API key.
 * @param options The options for creating the agent.
 * @returns The created agent object.
 */
export async function createAgent(
  apiKey: string,
  options: CreateAgentOptions
): Promise<ApiResponse<Agent>> {
  const url = 'https://api.straico.com/v0/agent';
  const headers = buildHeaders(apiKey);
  const urlencoded = new URLSearchParams();

  urlencoded.append('name', options.name);
  urlencoded.append('custom_prompt', options.custom_prompt);
  urlencoded.append('default_llm', options.default_llm);
  if (options.description) urlencoded.append('description', options.description);
  if (options.tags) urlencoded.append('tags', JSON.stringify(options.tags));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
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

/**
 * Retrieves a list of all agents.
 * @param apiKey Your Straico API key.
 * @returns An array of agent objects.
 */
export async function listAgents(apiKey: string): Promise<ApiResponse<Agent[]>> {
  const url = 'https://api.straico.com/v0/agent/';
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
 * Retrieves the details of a specific agent.
 * @param apiKey Your Straico API key.
 * @param agentId The ID of the agent to retrieve.
 * @returns The agent object.
 */
export async function getAgentDetails(
  apiKey: string,
  agentId: string
): Promise<ApiResponse<Agent>> {
  const url = `https://api.straico.com/v0/agent/${agentId}`;
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
 * Updates the details of a specific agent.
 * @param apiKey Your Straico API key.
 * @param agentId The ID of the agent to update.
 * @param options The options to update.
 * @returns The updated agent object.
 */
export async function updateAgent(
  apiKey: string,
  agentId: string,
  options: UpdateAgentOptions
): Promise<ApiResponse<Agent>> {
  const url = `https://api.straico.com/v0/agent/${agentId}`;
  const headers = buildHeaders(apiKey);
  const urlencoded = new URLSearchParams();

  if (options.name) urlencoded.append('name', options.name);
  if (options.custom_prompt) urlencoded.append('custom_prompt', options.custom_prompt);
  if (options.default_llm) urlencoded.append('default_llm', options.default_llm);
  if (options.description) urlencoded.append('description', options.description);
  if (options.tags) urlencoded.append('tags', JSON.stringify(options.tags));

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
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

/**
 * Deletes a specific agent.
 * @param apiKey Your Straico API key.
 * @param agentId The ID of the agent to delete.
 * @returns A confirmation message.
 */
export async function deleteAgent(
  apiKey: string,
  agentId: string
): Promise<ApiResponse<{ message: string }>> {
  const url = `https://api.straico.com/v0/agent/${agentId}`;
  const headers = buildHeaders(apiKey);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
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
 * Associates a RAG with a specific agent.
 * @param apiKey Your Straico API key.
 * @param agentId The ID of the agent.
 * @param ragId The ID of the RAG to associate.
 * @returns The updated agent object.
 */
export async function addRagToAgent(
  apiKey: string,
  agentId: string,
  ragId: string
): Promise<ApiResponse<Agent>> {
  const url = `https://stapi.straico.com/v0/agent/${agentId}/rag`;
  const headers = buildHeaders(apiKey);
  const body = JSON.stringify({ rag: ragId });

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

/**
 * Submits a prompt to a specific agent and gets a completion.
 * @param apiKey Your Straico API key.
 * @param agentId The ID of the agent to query.
 * @param options The options for the agent prompt completion.
 * @returns The completion response from the agent.
 */
export async function getAgentPromptCompletion(
  apiKey: string,
  agentId: string,
  options: AgentPromptOptions
): Promise<ApiResponse<RagCompletionResponse>> {
  const url = `https://api.straico.com/v0/agent/${agentId}/prompt`;
  const urlencoded = new URLSearchParams();
  urlencoded.append('prompt', options.prompt);

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