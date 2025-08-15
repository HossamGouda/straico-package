export function buildHeaders(apiKey: string): Headers {
  return new Headers({
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  });
}
