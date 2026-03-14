import { getApiClientConfig } from './runtime-config.js';

function buildRequestUrl(baseUrl: string, rawUrl: string) {
  if (/^https?:\/\//i.test(rawUrl)) {
    return rawUrl;
  }

  const normalizedBase = baseUrl.replace(/\/+$/, '');
  let normalizedPath = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;

  if (normalizedBase.endsWith('/api') && normalizedPath.startsWith('/api/')) {
    normalizedPath = normalizedPath.slice(4);
  } else if (normalizedBase.endsWith('/api') && normalizedPath === '/api') {
    normalizedPath = '';
  }

  return `${normalizedBase}${normalizedPath}`;
}

export async function customFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const config = getApiClientConfig();
  const requestUrl = buildRequestUrl(config.baseUrl, url);
  const requestFetch = config.fetch ?? globalThis.fetch;

  if (!requestFetch) {
    throw new Error('No fetch implementation is available for API requests.');
  }

  const response = await requestFetch(requestUrl, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API request failed (${response.status} ${response.statusText}): ${errorText}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}
