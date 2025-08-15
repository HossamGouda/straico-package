import {
  createRag,
  updateRag,
  deleteRag,
  getRagPromptCompletion,
} from '../src/rag';
import { RagPromptOptions } from '../src/types';

// Mock the global fetch function
global.fetch = jest.fn();

// Mock the File object for the Node.js environment
if (typeof File === 'undefined') {
  global.File = class MockFile {
    constructor(
      parts: (string | Blob | BufferSource)[],
      filename: string,
      options?: FilePropertyBag
    ) {
      // A basic mock that can be expanded if needed
    }
  } as any;
}

// Mock the FormData object for the Node.js environment
if (typeof FormData === 'undefined') {
  global.FormData = class MockFormData {
    append(name: string, value: any, fileName?: string): void {
      // A basic mock that can be expanded if needed
    }
  } as any;
}

describe('RAG API Functions', () => {
  const apiKey = 'test-api-key';
  const ragId = 'test-rag-id';

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  // Test for createRag
  describe('createRag', () => {
    it('should create a RAG successfully', async () => {
      const mockResponse = { success: true, data: { _id: ragId } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const options = {
        name: 'Test RAG',
        description: 'A test RAG',
        files: [new File([''], 'test.txt')],
      };

      const result = await createRag(apiKey, options);
      expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v0/rag', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  // Test for updateRag
  describe('updateRag', () => {
    it('should update a RAG successfully', async () => {
      const mockResponse = { success: true, data: { _id: ragId, name: 'Updated RAG' } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const files = [new File([''], 'update.txt')];
      const result = await updateRag(apiKey, ragId, files);
      expect(fetch).toHaveBeenCalledWith(`https://api.straico.com/v0/rag/${ragId}`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  // Test for deleteRag
  describe('deleteRag', () => {
    it('should delete a RAG successfully', async () => {
      const mockResponse = { success: true, message: 'RAG deleted successfully' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await deleteRag(apiKey, ragId);
      expect(fetch).toHaveBeenCalledWith(`https://api.straico.com/v0/rag/${ragId}`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  // Test for getRagPromptCompletion
  describe('getRagPromptCompletion', () => {
    it('should get a prompt completion successfully', async () => {
      const mockResponse = { success: true, data: { answer: 'This is a test.' } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const options: RagPromptOptions = {
        prompt: 'What is this?',
        model: 'test-model',
      };

      const result = await getRagPromptCompletion(apiKey, ragId, options);
      expect(fetch).toHaveBeenCalledWith(`https://api.straico.com/v0/rag/${ragId}/prompt`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });
});
