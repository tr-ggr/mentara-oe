'use client';

import { Callout, Text } from '@radix-ui/themes';
import { useGetAppMessage } from 'api-client';

export function AppMessage() {
  const { data, isLoading, isError, error } = useGetAppMessage();

  if (isLoading) {
    return (
      <Callout.Root color="gray" role="status">
        <Callout.Text>Loading API message...</Callout.Text>
      </Callout.Root>
    );
  }

  if (isError) {
    return (
      <Callout.Root color="red" role="alert">
        <Callout.Text>
          API request failed:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <Text size="3" highContrast>
      {data?.data.message ?? 'No message received.'}
    </Text>
  );
}
