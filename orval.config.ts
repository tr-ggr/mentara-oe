import { defineConfig } from 'orval';

export default defineConfig({
  mentaraApi: {
    input: {
      target: './apps/api/openapi.json',
    },
    output: {
      mode: 'tags-split',
      client: 'react-query',
      httpClient: 'fetch',
      target: './packages/api-client/src/lib/generated/endpoints.ts',
      schemas: './packages/api-client/src/lib/generated/models',
      override: {
        mutator: {
          path: './packages/api-client/src/lib/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
  },
});
