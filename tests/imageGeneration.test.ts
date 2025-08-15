import { generateImage, generateImageV1 } from '../src/imageGeneration';
import { ImageGenerationOptions, ImageGenerationOptionsV1 } from '../src/types';

// Mock the global fetch function
global.fetch = jest.fn();

describe('Image Generation API Functions', () => {
  const apiKey = 'test-api-key';

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('generateImage (v0)', () => {
    it('should generate an image successfully', async () => {
      const mockResponse = { success: true, data: { id: 'image-id', url: 'image-url' } };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const options: ImageGenerationOptions = {
        model: 'openai/dall-e-3',
        description: 'A test image',
        size: 'square',
        variations: 1,
      };

      const result = await generateImage(apiKey, options);
      expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v0/image/generation', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('generateImageV1', () => {
    it('should generate an image successfully with v1', async () => {
      const mockResponse = {
        success: true,
        data: {
          zip: 'zip-url',
          images: ['image-url'],
          price: { price_per_image: 1, quantity_images: 1, total: 1 },
        },
      };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const options: ImageGenerationOptionsV1 = {
        model: 'fal-ai/flux/dev',
        description: 'A test image v1',
        size: 'square',
        variations: 1,
      };

      const result = await generateImageV1(apiKey, options);
      expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v1/image/generation', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
  });
});


global.fetch = jest.fn() as jest.Mock;

describe('generateImage', () => {
    const apiKey = 'test-api-key';
    const options = {
        model: 'test-model',
        description: 'test-description',
        size: 'test-size',
        variations: 1,
    };

    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should call fetch with the correct URL and options', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ success: true }),
        };
        (fetch as jest.Mock).mockResolvedValue(mockResponse);

        await generateImage(apiKey, options);

        expect(fetch).toHaveBeenCalledWith('https://api.straico.com/v0/image/generation', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: options.model,
                description: options.description,
                size: options.size,
                variations: options.variations,
            }),
        });
    });

    it('should return the JSON response when the fetch is successful', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ success: true }),
        };
        (fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await generateImage(apiKey, options);

        expect(result).toEqual({ success: true });
    });

    it('should throw an error when the fetch response is not ok', async () => {
        const mockResponse = {
            ok: false,
            statusText: 'Bad Request',
        };
        (fetch as jest.Mock).mockResolvedValue(mockResponse);

        await expect(generateImage(apiKey, options)).rejects.toThrow('Network response was not ok: Bad Request');
    });
});