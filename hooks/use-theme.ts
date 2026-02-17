import { themes } from '@/constants/styling'
import type { ThemeMode, UseThemeResult } from '@/types/use-theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from 'nativewind'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'still:theme'

/**
 * useTheme
 *
 * Global design-system hook for Still.
 *
 * Provides:
 * - the user's selected theme mode (`light` | `dark` | `system`)
 * - resolved semantic color tokens
 * - a helper to update and persist theme preference
 *
 * Tailwind `dark:` classes automatically stay in sync via NativeWind.
 *
 * Use this hook when:
 * - styling navigation headers or inline JS styles
 * - building theme controls (e.g. settings screens)
 *
 * Do NOT use this just to conditionally apply Tailwind classes —
 * NativeWind already handles that automatically.
 */
export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<ThemeMode>('system')
  const { colorScheme, setColorScheme } = useColorScheme()

  /**
   * Resolved semantic colors based on NativeWind's active scheme.
   * Always returns either the light or dark palette.
   */
  const colors = themes[colorScheme === 'dark' ? 'dark' : 'light']

  const updateTheme = async (theme: ThemeMode) => {
    await AsyncStorage.setItem(STORAGE_KEY, theme)
    setTheme(theme)
    setColorScheme(theme)
  }

  /**
   * Initializes theme preference on mount.
   *
   * - Reads persisted theme from AsyncStorage.
   * - Seeds NativeWind {@link colorScheme} exactly once.
   *
   * NativeWind becomes the runtime source of truth after hydration.
   */
  useEffect(() => {
    const isValidTheme = (value: string | null): value is ThemeMode => {
      if (!value) return false
      return (['light', 'dark', 'system'] as string[]).includes(value)
    }

    const run = async () => {
      const prev = await AsyncStorage.getItem(STORAGE_KEY)

      if (isValidTheme(prev)) {
        setTheme(prev)
        setColorScheme(prev)
      } else {
        setColorScheme(theme)
      }
    }

    run()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    theme,
    colors,
    updateTheme,
  }
}
