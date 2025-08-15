import { generateImage } from '../src/imageGeneration';

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