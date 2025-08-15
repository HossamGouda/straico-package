import { getPromptCompletion } from '../src/promptCompletion';
import { buildHeaders } from '../src/utils';

jest.mock('../src/utils', () => ({
  buildHeaders: jest.fn(),
}));

global.fetch = jest.fn();

describe('getPromptCompletion', () => {
  const apiKey = 'test-api-key';
  const options = {
    models: ['test-model'],
    message: 'test message',
  };
  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('should return the message content on successful response', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: {
          completions: {
            'test-model': {
              completion: {
                choices: [
                  {
                    message: {
                      content: 'test content',
                    },
                  },
                ],
              },
            },
          },
        },
      }),
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);
    (buildHeaders as jest.Mock).mockReturnValue({
      'Content-Type': 'application/json',
    });

    const result = await getPromptCompletion(apiKey, options);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.straico.com/v1/prompt/completion',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          models: options.models,
          message: options.message,
        }),
      }
    );
    expect(result).toEqual({
      data: {
        completions: {
          'test-model': {
            completion: {
              choices: [
                {
                  message: {
                    content: 'test content',
                  },
                },
              ],
            },
          },
        },
      },
    });
  });

  it('should throw an error if the response is not ok', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Bad Request',
    };

    (fetch as jest.Mock).mockResolvedValue(mockResponse);
    (buildHeaders as jest.Mock).mockReturnValue({
      'Content-Type': 'application/json',
    });

    await expect(getPromptCompletion(apiKey, options)).rejects.toThrow(
      'Network response was not ok: Bad Request'
    );
  });

  it('should throw an error if fetch fails', async () => {
    const mockError = new Error('Fetch failed');

    (fetch as jest.Mock).mockRejectedValue(mockError);
    (buildHeaders as jest.Mock).mockReturnValue({
      'Content-Type': 'application/json',
    });

    await expect(getPromptCompletion(apiKey, options)).rejects.toThrow(
      'Fetch failed'
    );
  });
});
