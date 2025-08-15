import { getModels } from '../src/models';
import { buildHeaders } from '../src/utils';

jest.mock('../src/utils');
global.fetch = jest.fn();

describe('getModels', () => {
  const apiKey = 'test-api-key';
  const url = 'https://api.straico.com/v1/models';
  const headers = { Authorization: `Bearer ${apiKey}` };
  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

  beforeEach(() => {
    (buildHeaders as jest.Mock).mockReturnValue(headers);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('should return models data as a string on successful fetch', async () => {
    const mockData = { models: ['model1', 'model2'] };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getModels(apiKey);
    expect(result).toBe(JSON.stringify(mockData, null, 2));
    expect(fetch).toHaveBeenCalledWith(url, { method: 'GET', headers });
  });

  it('should throw an error if fetch response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(getModels(apiKey)).rejects.toThrow(
      'Error fetching models: Not Found'
    );
    expect(fetch).toHaveBeenCalledWith(url, { method: 'GET', headers });
  });

  it('should throw an error if fetch throws an error', async () => {
    const errorMessage = 'Network Error';
    (fetch as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getModels(apiKey)).rejects.toThrow(errorMessage);
    expect(fetch).toHaveBeenCalledWith(url, { method: 'GET', headers });
  });

  it('should call buildHeaders with the correct apiKey', async () => {
    const mockData = { models: ['model1', 'model2'] };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    await getModels(apiKey);
    expect(buildHeaders).toHaveBeenCalledWith(apiKey);
  });

  it('should handle empty response data gracefully', async () => {
    const mockData = {};
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getModels(apiKey);
    expect(result).toBe(JSON.stringify(mockData, null, 2));
    expect(fetch).toHaveBeenCalledWith(url, { method: 'GET', headers });
  });

  it('should handle unexpected response structure', async () => {
    const mockData = { unexpected: 'data' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getModels(apiKey);
    expect(result).toBe(JSON.stringify(mockData, null, 2));
    expect(fetch).toHaveBeenCalledWith(url, { method: 'GET', headers });
  });
});
