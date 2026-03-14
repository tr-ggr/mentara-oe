'use client';

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query';
import { configureApiClient } from 'api-client';
import type { ReactNode } from 'react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

export function Providers({ children }: { children: ReactNode }) {
  configureApiClient({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api',
  });

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
