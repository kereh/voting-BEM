"use client";

import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextTheme } from "next-themes";

export function Theme({ children, ...props }: ThemeProviderProps) {
  return <NextTheme {...props}>{children}</NextTheme>;
}
