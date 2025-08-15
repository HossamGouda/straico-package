import { getUserInfo } from '../src/userInfo';
import { buildHeaders } from '../src/utils';

jest.mock('../src/utils', () => ({
  buildHeaders: jest.fn(),
}));

global.fetch = jest.fn();

describe('getUserInfo', () => {
  const apiKey = 'test-api-key';
  const url = 'https://api.straico.com/v0/user';
  const headers = { Authorization: `Bearer ${apiKey}` };
  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
    (buildHeaders as jest.Mock).mockReturnValue(headers);
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('should return user info as a formatted JSON string', async () => {
    const mockResponse = {
      ok: true,
      json: jest
        .fn()
        .mockResolvedValue({ data: { id: '123', name: 'John Doe' } }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getUserInfo(apiKey);

    expect(buildHeaders).toHaveBeenCalledWith(apiKey);
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers,
    });
    expect(result).toBe(
      JSON.stringify({ id: '123', name: 'John Doe' }, null, 2)
    );
  });

  it('should throw an error if the network response is not ok', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Not Found',
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(getUserInfo(apiKey)).rejects.toThrow(
      'Network response was not ok: Not Found'
    );

    expect(buildHeaders).toHaveBeenCalledWith(apiKey);
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers,
    });
  });

  it('should throw an error if fetch fails', async () => {
    const errorMessage = 'Failed to fetch';
    (global.fetch as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserInfo(apiKey)).rejects.toThrow(errorMessage);

    expect(buildHeaders).toHaveBeenCalledWith(apiKey);
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers,
    });
  });
});
