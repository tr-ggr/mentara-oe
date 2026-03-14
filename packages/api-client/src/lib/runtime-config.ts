export type ApiClientConfig = {
  baseUrl: string;
  fetch?: typeof fetch;
};

let apiClientConfig: ApiClientConfig | null = null;

export function configureApiClient(config: ApiClientConfig) {
  const baseUrl = config.baseUrl.trim();
  if (!baseUrl) {
    throw new Error('configureApiClient requires a non-empty baseUrl.');
  }

  apiClientConfig = {
    ...config,
    baseUrl,
  };
}

export function getApiClientConfig(): ApiClientConfig {
  if (!apiClientConfig) {
    throw new Error(
      'API client is not configured. Call configureApiClient({ baseUrl }) before making requests.',
    );
  }

  return apiClientConfig;
}
