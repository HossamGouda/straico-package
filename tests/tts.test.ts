import { getElevenLabsVoices, createTextToSpeech } from '../src/tts';
import { TTSOptions } from '../src/types';

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

if (typeof Blob === 'undefined') {
  global.Blob = class MockBlob {
    constructor(parts?: any[], options?: any) {}
  } as any;
}

describe('TTS API Functions', () => {
  const apiKey = 'test-api-key';

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('getElevenLabsVoices', () => {
    it('should get a list of voices successfully', async () => {
      const mockResponse = { success: true, data: [{ id: 'voice-1', name: 'Test Voice' }] };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await getElevenLabsVoices(apiKey);
      expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v1/tts/elevenlabslist', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createTextToSpeech', () => {
    it('should create speech successfully', async () => {
      const mockBlob = new Blob(['audio data'], { type: 'audio/mpeg' });
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        blob: jest.fn().mockResolvedValue(mockBlob),
      });

      const options: TTSOptions = {
        model: 'eleven_multilingual_v2',
        text: 'Hello, world!',
        voice_id: 'voice-1',
      };

      const result = await createTextToSpeech(apiKey, options);
      expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v1/tts/create', expect.any(Object));
      expect(result).toEqual(mockBlob);
    });
  });
});
