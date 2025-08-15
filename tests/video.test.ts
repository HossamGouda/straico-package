import { generateImageToVideo } from '../src/video';
import { ImageToVideoOptions } from '../src/types';

// Mock the global fetch function
global.fetch = jest.fn();

// Mock browser-specific objects for the Node.js environment
if (typeof Headers === 'undefined') {
  global.Headers = class MockHeaders {
    constructor(init?: any) {}
    append(name: string, value: string): void {}
  } as any;
}

describe('Video API Functions', () => {
  const apiKey = 'test-api-key';

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('generateImageToVideo', () => {
    it('should generate a video successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          zip: 'zip-url',
          video: ['video-url'],
          price: { price_per_video: 1, total: 1 },
        },
      };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const options: ImageToVideoOptions = {
        model: 'test-model',
        description: 'A test video',
        size: 'square',
        duration: 5,
        image_url: 'image-url',
      };

      const result = await generateImageToVideo(apiKey, options);
      expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v1/image/tovideo', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });
});
