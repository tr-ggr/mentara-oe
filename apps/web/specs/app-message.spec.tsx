import React from 'react';
import { render } from '@testing-library/react';
import { AppMessage } from '../src/app/app-message';

const useGetAppMessage = jest.fn();

jest.mock('api-client', () => ({
  useGetAppMessage: () => useGetAppMessage(),
}));

describe('AppMessage', () => {
  it('renders loading state', () => {
    useGetAppMessage.mockReturnValue({
      data: null,
      isError: false,
      isLoading: true,
      error: null,
    });

    const { getByText } = render(<AppMessage />);
    expect(getByText('Loading API message...')).toBeTruthy();
  });

  it('renders error state', () => {
    useGetAppMessage.mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
      error: new Error('Server offline'),
    });

    const { getByText } = render(<AppMessage />);
    expect(getByText('API request failed: Server offline')).toBeTruthy();
  });

  it('renders success state', () => {
    useGetAppMessage.mockReturnValue({
      data: { data: { message: 'Healthy' } },
      isError: false,
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<AppMessage />);
    expect(getByText('Healthy')).toBeTruthy();
  });
});
