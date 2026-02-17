import { themes } from '@/constants/styling'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from 'nativewind'
import { useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'still:theme'

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('system')
  const { colorScheme, setColorScheme } = useColorScheme()
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
    updateTheme,
    colors,
  }
}
