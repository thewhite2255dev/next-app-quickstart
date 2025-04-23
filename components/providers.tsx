"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

interface providersProps {
  children: React.ReactNode;
}

export function Providers({ children }: providersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
