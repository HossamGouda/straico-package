import {
  createAgent,
  listAgents,
  getAgentDetails,
  updateAgent,
  deleteAgent,
  addRagToAgent,
  getAgentPromptCompletion,
} from '../src/agent';
import { AgentPromptOptions, CreateAgentOptions, UpdateAgentOptions } from '../src/types';

// Mock the global fetch function
global.fetch = jest.fn();

// Mock browser-specific objects for the Node.js environment
if (typeof Headers === 'undefined') {
  global.Headers = class MockHeaders {
    constructor(init?: any) {}
    append(name: string, value: string): void {}
  } as any;
}

if (typeof URLSearchParams === 'undefined') {
  global.URLSearchParams = class MockURLSearchParams {
    constructor(init?: any) {}
    append(name: string, value: string): void {}
  } as any;
}

describe('Agent API Functions', () => {
  const apiKey = 'test-api-key';
  const agentId = 'test-agent-id';
  const ragId = 'test-rag-id';

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('createAgent', () => {
    it('should create an agent successfully', async () => {
      const mockResponse = { success: true, data: { _id: agentId } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const options: CreateAgentOptions = {
        name: 'Test Agent',
        custom_prompt: 'Be helpful',
        default_llm: 'test-model',
      };

      const result = await createAgent(apiKey, options);
      expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v0/agent', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('listAgents', () => {
    it('should list agents successfully', async () => {
      const mockResponse = { success: true, data: [{ _id: agentId }] };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await listAgents(apiKey);
      expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v0/agent/', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAgentDetails', () => {
    it('should get agent details successfully', async () => {
      const mockResponse = { success: true, data: { _id: agentId } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await getAgentDetails(apiKey, agentId);
      expect(fetch).toHaveBeenCalledWith(`https://api.straico.com/v0/agent/${agentId}`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateAgent', () => {
    it('should update an agent successfully', async () => {
      const mockResponse = { success: true, data: { _id: agentId, name: 'Updated Agent' } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const options: UpdateAgentOptions = { name: 'Updated Agent' };
      const result = await updateAgent(apiKey, agentId, options);
      expect(fetch).toHaveBeenCalledWith(`https://api.straico.com/v0/agent/${agentId}`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteAgent', () => {
    it('should delete an agent successfully', async () => {
      const mockResponse = { success: true, message: 'Agent deleted successfully' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await deleteAgent(apiKey, agentId);
      expect(fetch).toHaveBeenCalledWith(`https://api.straico.com/v0/agent/${agentId}`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addRagToAgent', () => {
    it('should add a RAG to an agent successfully', async () => {
      const mockResponse = { success: true, data: { _id: agentId, rag_association: ragId } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await addRagToAgent(apiKey, agentId, ragId);
      expect(fetch).toHaveBeenCalledWith(`https://stapi.straico.com/v0/agent/${agentId}/rag`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAgentPromptCompletion', () => {
    it('should get a prompt completion successfully', async () => {
      const mockResponse = { success: true, data: { answer: 'This is a test.' } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const options: AgentPromptOptions = { prompt: 'What is this?' };
      const result = await getAgentPromptCompletion(apiKey, agentId, options);
      expect(fetch).toHaveBeenCalledWith(`https://api.straico.com/v0/agent/${agentId}/prompt`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });
});
