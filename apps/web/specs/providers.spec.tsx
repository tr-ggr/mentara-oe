import React from 'react';
import { render } from '@testing-library/react';
import { Providers } from '../src/app/providers';

const configureApiClient = jest.fn();

jest.mock('api-client', () => ({
  configureApiClient: (...args: unknown[]) => configureApiClient(...args),
}));

jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Providers', () => {
  beforeEach(() => {
    configureApiClient.mockClear();
  });

  it('configures the api client and renders children', () => {
    const { getByText } = render(
      <Providers>
        <p>child-content</p>
      </Providers>
    );

    expect(getByText('child-content')).toBeTruthy();
    expect(configureApiClient).toHaveBeenCalledWith({
      baseUrl: 'http://localhost:3000/api',
    });
  });
});
