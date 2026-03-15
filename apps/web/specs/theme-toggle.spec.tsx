import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeToggle } from '../src/app/theme-toggle';

const setTheme = jest.fn();
const useTheme = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: () => useTheme(),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    setTheme.mockClear();
    useTheme.mockReturnValue({
      resolvedTheme: 'light',
      setTheme,
    });
  });

  it('toggles from light to dark', async () => {
    const { findByRole } = render(<ThemeToggle />);
    const button = await findByRole('button', { name: 'Switch to dark' });

    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles from dark to light', async () => {
    useTheme.mockReturnValue({
      resolvedTheme: 'dark',
      setTheme,
    });

    const { findByRole } = render(<ThemeToggle />);
    const button = await findByRole('button', { name: 'Switch to light' });

    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
