import { useTheme } from '@/hooks/use-theme'
import type { UseThemeResult } from '@/types/use-theme'
import React, { createContext, useContext } from 'react'

const ThemeContext = createContext<UseThemeResult | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
}

/**
 * Provides global theme state for Still.
 *
 * Wrap this around your app root so any component can access
 * theme tokens via `useThemeContext`.
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const value = useTheme()

  return <ThemeContext value={value}>{children}</ThemeContext>
}

/**
 * Consumer hook for accessing global theme state.
 *
 * @throws if used outside `ThemeProvider` to prevent silent bugs.
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw Error(`useThemeContext must be used within ThemeProvider`)
  }

  return context
}
