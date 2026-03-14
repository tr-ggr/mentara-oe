'use client';

import { useGetAppMessage } from 'api-client';

export function AppMessage() {
  const { data, isLoading, isError, error } = useGetAppMessage();

  if (isLoading) {
    return <p>Loading API message...</p>;
  }

  if (isError) {
    return (
      <p>
        API request failed:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
    );
  }

  return <p>{data?.data.message ?? 'No message received.'}</p>;
}
