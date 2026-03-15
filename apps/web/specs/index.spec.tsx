import React from 'react';
import { render } from '@testing-library/react';
import Page from '../src/app/page';
import { Providers } from '../src/app/providers';

jest.mock('api-client', () => ({
  configureApiClient: jest.fn(),
  useGetAppMessage: jest.fn(() => ({
    data: { data: { message: 'API is reachable' } },
    isError: false,
    isLoading: false,
    error: null,
  })),
}));

jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTheme: () => ({
    resolvedTheme: 'light',
    setTheme: jest.fn(),
  }),
}));

describe('Page', () => {
  it('should render successfully', async () => {
    const { findByRole, getByText } = render(
      <Providers>
        <Page />
      </Providers>
    );

    expect(await findByRole('heading', { name: 'Mentara OE' })).toBeTruthy();
    expect(await findByRole('button', { name: 'Switch to dark' })).toBeTruthy();
    expect(getByText('API is reachable')).toBeTruthy();
  });
});
