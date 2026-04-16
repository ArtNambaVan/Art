'use client';
import { type ThemeProviderProps, ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ReactElement } from 'react';

const ThemeProvider = ({children, ...props}: ThemeProviderProps): ReactElement => (
    <NextThemeProvider {...props}>
      { children }
    </NextThemeProvider>
  );

export default ThemeProvider;