'use client';

import { Button } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  return (
    <Button onClick={() => setTheme(nextTheme)} variant="soft">
      {isDark ? 'Switch to light' : 'Switch to dark'}
    </Button>
  );
}
